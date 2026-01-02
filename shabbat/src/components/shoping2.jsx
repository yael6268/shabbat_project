export const Shoping2 = (props) => {
    const { shoping, showOnly } = props;
    return (
        <li className="shop-item">
            <input type="checkbox" className="custom-checkbox" />
                {shoping.name}
                
        </li>
    );
}
