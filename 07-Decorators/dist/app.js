"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(message) {
    return function (constructor) {
        console.log(message);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(...args) {
                super();
                const el = document.getElementById(hookId);
                if (el) {
                    el.innerHTML = template;
                    const h1 = el.querySelector('h1');
                    if (h1) {
                        h1.textContent = this.name;
                    }
                }
            }
        };
    };
}
// Class Decorator
let Person = class Person {
    constructor() {
        this.name = "Nathnael";
        console.log("Hello How Is You ?");
    }
};
Person = __decorate([
    Logger('Logging _ person'),
    WithTemplate("<h1>Hi Nathnael</h1>", "app")
], Person);
const per = new Person();
console.log(per);
function Log(target, propertyName) {
    console.log('Property decorator');
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log('Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('Method Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('Parameter Decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}
// Property Decorator
class Product {
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price - shouid be');
        }
    }
    constructor(t, p) {
        this._price = p;
        this.title = t;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'This Works !';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const btn = document.querySelector('button');
console.log(btn);
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', p.showMessage);
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', e => {
    e.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createCourse = new Course(title, price);
    console.log(createCourse);
});
