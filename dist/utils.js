var Utils;
(function (Utils) {
    var Bools = (function () {
        function Bools() {
        }
        Bools.GetBool = function (val, defaultVal) {
            if (val === null || typeof (val) === 'undefined') {
                return defaultVal;
            }
            return val;
        };
        return Bools;
    })();
    Utils.Bools = Bools;
})(Utils || (Utils = {}));
var Utils;
(function (Utils) {
    var Colors = (function () {
        function Colors() {
        }
        Colors.Float32ColorToARGB = function (float32Color) {
            var a = (float32Color & 0xff000000) >>> 24;
            var r = (float32Color & 0xff0000) >>> 16;
            var g = (float32Color & 0xff00) >>> 8;
            var b = float32Color & 0xff;
            var result = [a, r, g, b];
            return result;
        };
        Colors._ComponentToHex = function (c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        };
        Colors.RGBToHexString = function (rgb) {
            Colors.Coalesce(rgb);
            return "#" + Colors._ComponentToHex(rgb[0]) + Colors._ComponentToHex(rgb[1]) + Colors._ComponentToHex(rgb[2]);
        };
        Colors.ARGBToHexString = function (argb) {
            return "#" + Colors._ComponentToHex(argb[0]) + Colors._ComponentToHex(argb[1]) + Colors._ComponentToHex(argb[2]) + Colors._ComponentToHex(argb[3]);
        };
        Colors.Coalesce = function (arr) {
            for (var i = 1; i < arr.length; i++) {
                if (typeof (arr[i]) === 'undefined')
                    arr[i] = arr[i - 1];
            }
        };
        return Colors;
    })();
    Utils.Colors = Colors;
})(Utils || (Utils = {}));
var Utils;
(function (Utils) {
    var Dates = (function () {
        function Dates() {
        }
        Dates.GetTimeStamp = function () {
            return new Date().getTime();
        };
        return Dates;
    })();
    Utils.Dates = Dates;
})(Utils || (Utils = {}));
var Utils;
(function (Utils) {
    var Maths;
    (function (Maths) {
        var Vector = (function () {
            function Vector(x, y) {
                this.X = x;
                this.Y = y;
            }
            Vector.prototype.Get = function () {
                return new Vector(this.X, this.Y);
            };
            Vector.prototype.Set = function (x, y) {
                this.X = x;
                this.Y = y;
            };
            //get X(): number {
            //    return this._X;
            //}
            //
            //set X(value: number) {
            //    this._X = value;
            //    //this.OnPropertyChanged("X");
            //}
            //
            //get Y(): number {
            //    return this._Y;
            //}
            //
            //set Y(value: number) {
            //    this._Y = value;
            //    //this.OnPropertyChanged("Y");
            //}
            Vector.prototype.Add = function (v) {
                this.X += v.X;
                this.Y += v.Y;
            };
            Vector.Add = function (v1, v2) {
                return new Vector(v1.X + v2.X, v1.Y + v2.Y);
            };
            Vector.prototype.Sub = function (v) {
                this.X -= v.X;
                this.Y -= v.Y;
            };
            Vector.Sub = function (v1, v2) {
                return new Vector(v1.X - v2.X, v1.Y - v2.Y);
            };
            Vector.prototype.Mult = function (n) {
                this.X = this.X * n;
                this.Y = this.Y * n;
            };
            Vector.Mult = function (v1, v2) {
                return new Vector(v1.X * v2.X, v1.Y * v2.Y);
            };
            Vector.MultN = function (v1, n) {
                return new Vector(v1.X * n, v1.Y * n);
            };
            Vector.prototype.Div = function (n) {
                this.X = this.X / n;
                this.Y = this.Y / n;
            };
            Vector.Div = function (v1, v2) {
                return new Vector(v1.X / v2.X, v1.Y / v2.Y);
            };
            Vector.DivN = function (v1, n) {
                return new Vector(v1.X / n, v1.Y / n);
            };
            Vector.prototype.Mag = function () {
                return Math.sqrt(this.X * this.X + this.Y * this.Y);
            };
            Vector.prototype.MagSq = function () {
                return (this.X * this.X + this.Y * this.Y);
            };
            Vector.prototype.Normalise = function () {
                var m = this.Mag();
                if (m != 0 && m != 1) {
                    this.Div(m);
                }
            };
            Vector.prototype.Limit = function (max) {
                if (this.MagSq() > max * max) {
                    this.Normalise();
                    this.Mult(max);
                }
            };
            Vector.prototype.Equals = function (v) {
                return (this.X == v.X && this.Y == v.Y);
            };
            Vector.prototype.Heading = function () {
                var angle = Math.atan2(-this.Y, this.X);
                return -1 * angle;
            };
            Vector.Random2D = function () {
                return Vector.FromAngle((Math.random() * Math.TAU));
            };
            Vector.FromAngle = function (angle) {
                return new Vector(Math.cos(angle), Math.sin(angle));
            };
            return Vector;
        })();
        Maths.Vector = Vector;
    })(Maths = Utils.Maths || (Utils.Maths = {}));
})(Utils || (Utils = {}));
var Utils;
(function (Utils) {
    var Measurements;
    (function (Measurements) {
        var Size = (function () {
            function Size(width, height) {
                this.width = width;
                this.height = height;
            }
            return Size;
        })();
        Measurements.Size = Size;
        var Dimensions = (function () {
            function Dimensions() {
            }
            Dimensions.FitRect = function (width1, height1, width2, height2) {
                var ratio1 = height1 / width1;
                var ratio2 = height2 / width2;
                var width, height, scale;
                if (ratio1 < ratio2) {
                    scale = width2 / width1;
                    width = width1 * scale;
                    height = height1 * scale;
                }
                if (ratio2 < ratio1) {
                    scale = height2 / height1;
                    width = width1 * scale;
                    height = height1 * scale;
                }
                return new Size(Math.floor(width), Math.floor(height));
            };
            return Dimensions;
        })();
        Measurements.Dimensions = Dimensions;
    })(Measurements = Utils.Measurements || (Utils.Measurements = {}));
})(Utils || (Utils = {}));
var Utils;
(function (Utils) {
    var Numbers = (function () {
        function Numbers() {
        }
        Numbers.NumericalInput = function (event) {
            // Allow: backspace, delete, tab and escape
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
                // let it happen, don't do anything
                return true;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                    return false;
                }
                return true;
            }
        };
        return Numbers;
    })();
    Utils.Numbers = Numbers;
})(Utils || (Utils = {}));
var Utils;
(function (Utils) {
    var Objects = (function () {
        function Objects() {
        }
        Objects.ConvertToPlainObject = function (obj) {
            return JSON.parse(JSON.stringify(obj));
        };
        return Objects;
    })();
    Utils.Objects = Objects;
})(Utils || (Utils = {}));
var Utils;
(function (Utils) {
    var Strings = (function () {
        function Strings() {
        }
        Strings.Ellipsis = function (text, chars) {
            if (text.length <= chars)
                return text;
            var trimmedText = text.substr(0, chars);
            var lastSpaceIndex = trimmedText.lastIndexOf(" ");
            if (lastSpaceIndex != -1) {
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, lastSpaceIndex));
            }
            return trimmedText + "&hellip;";
        };
        Strings.HtmlDecode = function (encoded) {
            var div = document.createElement('div');
            div.innerHTML = encoded;
            return div.firstChild.nodeValue;
        };
        return Strings;
    })();
    Utils.Strings = Strings;
})(Utils || (Utils = {}));
var Utils;
(function (Utils) {
    var Urls = (function () {
        function Urls() {
        }
        Urls.GetHashParameter = function (key, doc) {
            if (!doc)
                doc = window.document;
            var regex = new RegExp("#.*[?&]" + key + "=([^&]+)(&|$)");
            var match = regex.exec(doc.location.hash);
            return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        };
        Urls.SetHashParameter = function (key, value, doc) {
            if (!doc)
                doc = window.document;
            var kvp = this.UpdateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);
            var newHash = "#?" + kvp;
            var url = doc.URL;
            // remove hash value (if present).
            var index = url.indexOf('#');
            if (index != -1) {
                url = url.substr(0, url.indexOf('#'));
            }
            doc.location.replace(url + newHash);
        };
        Urls.GetQuerystringParameter = function (key, w) {
            if (!w)
                w = window;
            return this.GetQuerystringParameterFromString(key, w.location.search);
        };
        Urls.GetQuerystringParameterFromString = function (key, querystring) {
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
            var match = regex.exec(querystring);
            return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        };
        Urls.SetQuerystringParameter = function (key, value, doc) {
            if (!doc)
                doc = window.document;
            var kvp = this.UpdateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);
            // redirects.
            window.location.search = kvp;
        };
        Urls.UpdateURIKeyValuePair = function (uriSegment, key, value) {
            key = encodeURIComponent(key);
            value = encodeURIComponent(value);
            var kvp = uriSegment.split('&');
            // Array.split() returns an array with a single "" item
            // if the target string is empty. remove if present.
            if (kvp[0] == "")
                kvp.shift();
            var i = kvp.length;
            var x;
            while (i--) {
                x = kvp[i].split('=');
                if (x[0] == key) {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }
            // not found, so append.
            if (i < 0) {
                kvp[kvp.length] = [key, value].join('=');
            }
            return kvp.join('&');
        };
        Urls.GetUrlParts = function (url) {
            var a = document.createElement('a');
            a.href = url;
            return a;
        };
        Urls.ConvertToRelativeUrl = function (url) {
            var parts = this.GetUrlParts(url);
            var relUri = parts.pathname + parts.searchWithin;
            if (!relUri.startsWith("/")) {
                relUri = "/" + relUri;
            }
            return relUri;
        };
        return Urls;
    })();
    Utils.Urls = Urls;
})(Utils || (Utils = {}));
