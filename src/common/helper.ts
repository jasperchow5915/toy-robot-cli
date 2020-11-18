export class ClassHelpers {
    public static getName(obj: any): string {
        if (obj.name) {
            return obj.name;
        }

        let funcNameRegex = /function (.{1,})\(/;
        let results = (funcNameRegex).exec(obj.toString());
        let result: string | false | null | undefined = results && results.length > 1 && results[1];

        if (!result) {
            funcNameRegex = /return .([^;]+)/;
            results = (funcNameRegex).exec(obj.toString());
            result = results && results != undefined && results.length > 1 && results[1].split(".").pop();
        }

        return result || "";
    }
}