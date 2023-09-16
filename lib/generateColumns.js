import range from "@/lib/range";

const generateColumns = (array, numberOfColumns) => {
  let splitArray = [];
  range(numberOfColumns).forEach(() => splitArray.push({ id: Math.random(), content: [] }));
  let currentIndex = 0;

  array.forEach((item) => {
    splitArray[currentIndex].content.push(item);
    if (currentIndex === numberOfColumns - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
  });

  return splitArray;
};

export default generateColumns;
