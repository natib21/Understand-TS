var person = {
    name: "Nathnael",
    age: 28,
    hobbies: ["Sport", "Cooking"]
};
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
