export default function DateDisplay(props) {
	const { date, ignoreInvalid } = props;	

	if (!date) return ignoreInvalid ? '' : 'invalid date';
	if (!(date instanceof Date)) return (new Date(date)).toLocaleString();
	return date.toLocaleString();
}