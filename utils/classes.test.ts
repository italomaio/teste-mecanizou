import { cn } from "./classes";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should handle conditional class names", () => {
    expect(cn("class1", false && "class2", "class3")).toBe("class1 class3");
  });

  it("should merge Tailwind classes correctly", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("should handle empty inputs", () => {
    expect(cn()).toBe("");
  });

  it("should handle undefined and null values", () => {
    expect(cn("class1", undefined, null, "class2")).toBe("class1 class2");
  });

  it("should handle arrays of class names", () => {
    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
  });
});
