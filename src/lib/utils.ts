export let LAYOUTS: Record<string, { cells: Array<{ colspan: number; rowspan: number }> }> = {
	'grid-2': {
		cells: [
			{
				colspan: 4,
				rowspan: 8
			},
			{
				colspan: 4,
				rowspan: 8
			}
		]
	},
	'grid-3': {
		cells: [
			{
				colspan: 8,
				rowspan: 4
			},
			{
				colspan: 4,
				rowspan: 8
			},
			{
				colspan: 4,
				rowspan: 8
			}
		]
	},
	'grid-4': {
		cells: [
			{
				colspan: 4,
				rowspan: 4
			},
			{
				colspan: 4,
				rowspan: 4
			},
			{
				colspan: 4,
				rowspan: 4
			},
			{
				colspan: 4,
				rowspan: 4
			}
		]
	},
	'grid-5': {
		cells: [
			{
				colspan: 4,
				rowspan: 4
			},
			{
				colspan: 4,
				rowspan: 4
			},
			{
				colspan: 2,
				rowspan: 4
			},
			{
				colspan: 4,
				rowspan: 4
			},
			{
				colspan: 2,
				rowspan: 4
			}
		]
	},
	'grid-6': {
		cells: [
			{
				colspan: 4,
				rowspan: 4
			},
			{
				colspan: 4,
				rowspan: 4
			},
			{
				colspan: 2,
				rowspan: 4
			},
			{
				colspan: 2,
				rowspan: 4
			},
			{
				colspan: 4,
				rowspan: 2
			},
			{
				colspan: 4,
				rowspan: 2
			}
		]
	},
	'grid-7': {
		cells: [
			{
				colspan: 4,
				rowspan: 2
			},
			{
				colspan: 4,
				rowspan: 2
			},
			{
				colspan: 2,
				rowspan: 4
			},
			{
				colspan: 4,
				rowspan: 4
			},
			{
				colspan: 2,
				rowspan: 4
			},
			{
				colspan: 4,
				rowspan: 2
			},
			{
				colspan: 4,
				rowspan: 2
			}
		]
	},
	'grid-8': {
		cells: [
			{
				colspan: 6,
				rowspan: 6
			},
			{
				colspan: 2,
				rowspan: 2
			},
			{
				colspan: 2,
				rowspan: 2
			},
			{
				colspan: 2,
				rowspan: 2
			},
			{
				colspan: 2,
				rowspan: 2
			},
			{
				colspan: 2,
				rowspan: 2
			},
			{
				colspan: 2,
				rowspan: 2
			},
			{
				colspan: 2,
				rowspan: 2
			}
		]
	}
};
