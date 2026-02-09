export const Cooking = (props) => {
    const { cook } =props;
    return <li>
        <p>{cook.name}</p>
        <p>{cook.PreparationTime}</p>
        <p>{cook.status}</p>
        <label id="isPrepared">מוכן  </label>
    </li>
}