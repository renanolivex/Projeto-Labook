import { v1, v4 } from "uuid";

export class IdGenerator {
    public generateId():string {
        return v4()
    }
}

export class IdGeneratorPost {
    public generateId():string {
        return v4()
    }
}