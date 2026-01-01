export const Shoping2 = (props) => {
    const { shoping, showOnly } = props;
    return (
        <li className="shop-item">
            <div className="item-left">
                {shoping.name}
            </div>
        </li>
    );
}
