import {writeFileSync, existsSync, readFileSync} from "fs";
import { v4 as uuidv4 } from 'uuid';

export class sessionManager {
    private sessionID: string | undefined = undefined
    private expirationDate: Date | undefined = undefined
    private lastIP: string | undefined = undefined

    constructor() {
        if (!existsSync('session.temp')) {
            writeFileSync('session.temp', '')
            console.log("made it here")
        }
    }

    public createSession(clientIP: string): string {
        this.sessionID = uuidv4()
        this.lastIP = clientIP

        this.writeSession()

        return this.sessionID
    }

    public validSession(sessionID: string, currentIP: string): boolean {
        this.readSession()

        const valid = this.sessionID !== undefined
            && this.expirationDate !== undefined
            && this.lastIP !== undefined
            && this.sessionID === sessionID
            && (this.expirationDate?.getTime() > (new Date()).getTime())
            && this.lastIP === currentIP


        if (!valid)
            writeFileSync('session.temp', '')
        else
            this.writeSession()

        return valid
    }

    public removeSessions() {
        if (existsSync('session.temp')) writeFileSync('session.temp', '')
    }

    private readSession() {
        const storedSession = readFileSync('session.temp').toString().split('|')

        if (storedSession.length === 3) {
            this.sessionID = storedSession[0]
            this.expirationDate = new Date(storedSession[1])
            this.lastIP = storedSession[2]
        }
    }

    private writeSession() {
        writeFileSync(
            'session.temp',
            `${this.sessionID}|${this.getInOneHour()}|${this.lastIP}`
        )
    }

    private getInOneHour(): Date {
        return new Date((new Date()).getTime() + 60 * 60 * 1000)
    }
}