import dayjs from '../utils/dayjs';
import { getTeam } from '../data/team';

export function bytes(bytes, decimals = 2, current = 0) {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));

	return (
		parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i + current]
	);
}

export function duration(value) {
	if (!value) return;

	let [hours, minutes, seconds] = value.split(':');
	[hours, minutes, seconds] = [
		parseInt(hours),
		parseInt(minutes),
		parseInt(seconds)
	];

	let format = '';
	if (hours > 0) {
		format = 'H[h] m[m] s[s]';
	} else if (minutes > 0) {
		format = 'm[m] s[s]';
	} else {
		format = 's[s]';
	}
	return dayjs.duration({ hours, minutes, seconds }).format(format);
}

export function datetime(value) {
	return dayjs(value).format('DD/MM/YYYY HH:mm:ss');
}

export function plural(number, singular, plural) {
	if (number === 1) {
		return singular;
	}
	return plural;
}

export function planTitle(plan) {
	let $team = getTeam();
	let india = $team.doc.country == 'India';
	let currency = india ? '₹' : '$';
	let price_field = india ? 'price_inr' : 'price_usd';
	let price =
		plan.block_monthly == 1 ? plan[price_field] * 12 : plan[price_field];
	return price > 0 ? `${currency}${price}` : plan.plan_title;
}

export function userCurrency(value) {
	let $team = getTeam();
	let india = $team.doc.currency == 'INR';
	let symbol = india ? '₹' : '$';
	return `${symbol}${value}`;
}
