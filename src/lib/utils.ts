export const LAYOUTS: Record<
  string,
  {
    cells: Array<{
      width: number;
      height: number;
      colspan: number;
      rowspan: number;
    }>;
  }
> = {
  "grid-2": {
    cells: [
      {
        width: 350,
        height: 700,
        colspan: 4,
        rowspan: 8,
      },
      {
        width: 350,
        height: 700,
        colspan: 4,
        rowspan: 8,
      },
    ],
  },
  "grid-3": {
    cells: [
      {
        width: 700,
        height: 350,
        colspan: 8,
        rowspan: 4,
      },
      {
        width: 350,
        height: 700,
        colspan: 4,
        rowspan: 8,
      },
      {
        width: 350,
        height: 700,
        colspan: 4,
        rowspan: 8,
      },
    ],
  },
  "grid-4": {
    cells: [
      {
        width: 350,
        height: 350,
        colspan: 4,
        rowspan: 4,
      },
      {
        width: 350,
        height: 350,
        colspan: 4,
        rowspan: 4,
      },
      {
        width: 350,
        height: 350,
        colspan: 4,
        rowspan: 4,
      },
      {
        width: 350,
        height: 350,
        colspan: 4,
        rowspan: 4,
      },
    ],
  },
  "grid-5": {
    cells: [
      {
        width: 350,
        height: 350,
        colspan: 4,
        rowspan: 4,
      },
      {
        width: 350,
        height: 350,
        colspan: 4,
        rowspan: 4,
      },
      {
        width: 175,
        height: 350,
        colspan: 2,
        rowspan: 4,
      },
      {
        width: 350,
        height: 350,
        colspan: 4,
        rowspan: 4,
      },
      {
        width: 175,
        height: 350,
        colspan: 2,
        rowspan: 4,
      },
    ],
  },
  "grid-6": {
    cells: [
      {
        width: 350,
        height: 350,
        colspan: 4,
        rowspan: 4,
      },
      {
        width: 350,
        height: 350,
        colspan: 4,
        rowspan: 4,
      },
      {
        width: 175,
        height: 350,
        colspan: 2,
        rowspan: 4,
      },
      {
        width: 175,
        height: 350,
        colspan: 2,
        rowspan: 4,
      },
      {
        width: 350,
        height: 175,
        colspan: 4,
        rowspan: 2,
      },
      {
        width: 350,
        height: 175,
        colspan: 4,
        rowspan: 2,
      },
    ],
  },
  "grid-7": {
    cells: [
      {
        width: 350,
        height: 175,
        colspan: 4,
        rowspan: 2,
      },
      {
        width: 350,
        height: 175,
        colspan: 4,
        rowspan: 2,
      },
      {
        width: 175,
        height: 350,
        colspan: 2,
        rowspan: 4,
      },
      {
        width: 350,
        height: 350,
        colspan: 4,
        rowspan: 4,
      },
      {
        width: 175,
        height: 350,
        colspan: 2,
        rowspan: 4,
      },
      {
        width: 350,
        height: 175,
        colspan: 4,
        rowspan: 2,
      },
      {
        width: 350,
        height: 175,
        colspan: 4,
        rowspan: 2,
      },
    ],
  },
  "grid-8": {
    cells: [
      {
        width: 550,
        height: 550,
        colspan: 6,
        rowspan: 6,
      },
      {
        width: 175,
        height: 175,
        colspan: 2,
        rowspan: 2,
      },
      {
        width: 175,
        height: 175,
        colspan: 2,
        rowspan: 2,
      },
      {
        width: 175,
        height: 175,
        colspan: 2,
        rowspan: 2,
      },
      {
        width: 175,
        height: 175,
        colspan: 2,
        rowspan: 2,
      },
      {
        width: 175,
        height: 175,
        colspan: 2,
        rowspan: 2,
      },
      {
        width: 175,
        height: 175,
        colspan: 2,
        rowspan: 2,
      },
      {
        width: 175,
        height: 175,
        colspan: 2,
        rowspan: 2,
      },
    ],
  },
};
