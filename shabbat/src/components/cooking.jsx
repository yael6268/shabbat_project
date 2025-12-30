export const Cooking = (props) => {
    const { cook } =props;
    return <li>
        <p>{cook.name}</p>
        <p>{cook.PreparationTime}</p>
        <p>{cook.status}</p>
        <label htmlFor="isPrepared">מוכן  </label>
        <input type="checkbox"/>
    </li>
}