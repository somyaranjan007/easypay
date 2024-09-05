export const homePageTransitions = {
  initial: (direction: string) => ({
    x: direction === "right" ? "-50%" : "50%",
    y: 0,
    opacity: 0,
  }),
  in: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  out: (direction: string) => ({
    x: direction === "right" ? "50%" : "-50%",
    y: 0,
    opacity: 0,
  }),
};
