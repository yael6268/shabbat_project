export const Shoping = (props) => {
    const { shoping , showOnly } =props;
    return <li>
        <p>{shoping.name}</p>
        {/* {showOnly && <p>{shoping.showOnly}</p>} */}
    </li>
}