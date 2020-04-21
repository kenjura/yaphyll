export default function DateDisplay(props) {
	const { date } = props;	

	if (!date) return 'invalid date';
	if (!(date instanceof Date)) return (new Date(date)).toLocaleString();
	return date.toLocaleString();
}