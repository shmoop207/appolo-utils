import {Numbers} from "./numbers";
import {Arrays} from "./arrays";
import {Classes} from "./classes";
import {Guid} from "./guid";
import {Hash} from "./hash";
import {Objects} from "./objects";
import {Promises} from "./promises";
import {Strings} from "./strings";
import {Time} from "./time";
import {Files} from "./files";
import {Enums} from "./enums";

export class Util {
    public static get numbers(): typeof Numbers {
        return Numbers
    }

    public static get arrays(): typeof Arrays {
        return Arrays
    }

    public static get classes(): typeof Classes {
        return Classes
    }

    public static get guid(): typeof Guid {
        return Guid
    }

    public static get hash(): typeof Hash {
        return Hash
    }

    public static get objects(): typeof Objects {
        return Objects
    }

    public static get promises(): typeof Promises {
        return Promises
    }

    public static get strings(): typeof Strings {
        return Strings
    }

    public static get time(): typeof Time {
        return Time
    }

    public static get files(): typeof Files {
        return Files
    }

    public static get enums(): typeof Enums{
        return Enums
    }
}
