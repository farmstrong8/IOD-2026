const box1 = {
    size: "large",
    dimensions: { width: 50, length: 70, height: 30, units: "cm" },
    items: ["glasses", "plates", "cutlery"],
};

const box1Shallow = { ...box1 };
const boxString = JSON.stringify(box1); // convert object to string
const box2 = JSON.parse(boxString); // convert string back to new object

// how could we check to make sure both boxes are the same but independent?
console.log(box1 == box2); // true
console.log(box1 === box2); // false

console.log(box1.size === box2.size); // true
console.log(box1.dimensions === box2.dimensions); // false
console.log(box1.items === box2.items); // false

console.log(box1.dimensions.width === box2.dimensions.width); // true
console.log(box1.dimensions.length === box2.dimensions.length); // true
console.log(box1.dimensions.height === box2.dimensions.height); // true
console.log(box1.dimensions.units === box2.dimensions.units); // true

console.log(box1.items[0] === box2.items[0]); // true
console.log(box1.items[1] === box2.items[1]); // true
console.log(box1.items[2] === box2.items[2]); // true

const box1Keys = Object.keys(box1);

const box2Keys = Object.keys(box2);

for (const key of box1Keys) {
    if (box1[key] !== box2[key]) {
        console.log(`${key} is different`);
    }
}

box2.random = "random";

console.log(box1);
console.log(box2);

const arrayOfObjects = [box1, box2];

const sizes = arrayOfObjects.map((obj) => obj.size);

console.log(sizes);
