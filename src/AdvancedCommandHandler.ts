/*
 * Copyright © 2022 Ben Petrillo. All rights reserved.
 *
 * Project licensed under the MIT License: https://www.mit.edu/~amini/LICENSE.md
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * All portions of this software are available for public use, provided that
 * credit is given to the original author(s).
 */

import {Client, Collection} from "discord.js";
import AdvancedCommand from "./structs/AdvancedCommand";
import CommandInteractionEvent from "./events/CommandInteractionEvent";
import Manager from "./managers/Manager";

export class AdvancedCommandHandler {

    private commandClasses: AdvancedCommand[] = [];
    private commands: Collection<string, AdvancedCommand> = new Collection<string, AdvancedCommand>();
    private readonly declare manager: Manager;
    private readonly declare client: Client;

    constructor(client: Client) {
        this.client = client;
        this.manager = new Manager(this);
        this.client.once("ready", () => {
            new CommandInteractionEvent(client, "interactionCreate", false);
        });
    }

    /**
     * Register an array of commands to the handler.
     * @param commands The commands to register.
     * @return AdvancedCommandHandler
     */

    public registerCommands(commands: AdvancedCommand[]): AdvancedCommandHandler {
        for (const command of commands) {
            this.commands.set(command.getName(), command);
            this.commandClasses.push(command);
        }
        return this;
    }

    /**
     * Get the array of AdvancedCommand instances for this handler.
     * @return AdvancedCommand[]
     */

    public getCommandClasses(): AdvancedCommand[] {
        return this.commandClasses;
    }

    /**
     * Get the command map for this instance.
     * @return Collection<string, AdvancedCommand>
     */

    public getCommandMap(): Collection<string, AdvancedCommand> {
        return this.commands;
    }

    /**
     * Get the command handler manager.
     * @return Manager
     */
    
    public getManager(): Manager {
        return this.manager;
    }

    /**
     * Get the Discord client instance.
     * @return Client
     */

    public getClient(): Client {
        return this.client;
    }
}