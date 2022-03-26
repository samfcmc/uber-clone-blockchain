export const ridesSchema = {
	name: 'rides',
	title: 'Rides',
	type: 'document',
	fields: [
		{
			name: 'orderById',
			type: 'number',
			title: 'Order by Id',
		},
		{
			name: 'title',
			type: 'string',
			title: 'Title',
		},
		{
			name: 'priceMultiplier',
			type: 'number',
			title: 'Price Multiplier',
		},
		{
			name: 'icon',
			type: 'image',
			title: 'Icon',
		},
	]
}