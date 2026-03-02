export const Cooking = (props) => {
    const { cook } =props;
    return <div key={cook.id}>
        <div>{cook.name} {cook.PreparationTime}</div>
        {/* <div>{cook.PreparationTime}</div> */}
        {/* <p>{cook.status}</p> */}
        {/* <label id="isPrepared">מוכן  </label> */}
    </div>
}