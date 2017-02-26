namespace Utils {

    export class Strings {
        static ellipsis(text: string, chars: number): string {
            if (text.length <= chars) return text;
            let trimmedText: string = text.substr(0, chars);
            const lastSpaceIndex: number = trimmedText.lastIndexOf(" ");
            if (lastSpaceIndex != -1){
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, lastSpaceIndex));
            }
            return trimmedText + "&hellip;";
        }

        static htmlDecode(encoded: string): string {
            const div: HTMLDivElement = document.createElement('div');
            div.innerHTML = encoded;
            return <string>(<Node>div.firstChild).nodeValue;
        }
    }

}