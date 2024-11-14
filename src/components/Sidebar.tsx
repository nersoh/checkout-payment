
function Sidebar() {
  return (
    <div className="summary sidebar">
        <ul className="summary__list">
            <li className="summary__list-item">
                <span className="summary__list-item-name">Brazil 2024 Stadium Home</span>
                <span className="summary__list-item-price">€99.99</span>
            </li>
            <li className="summary__list-item">
                <span className="summary__list-item-name">Nike Mercurial Superfly 10 Elite</span>
                <span className="summary__list-item-price">€279.99</span>
            </li>

            <li className="summary__list-item-total">
                <span className="summary__list-item-name">Total</span>
                <span className="summary__list-item-price">€379.98</span>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar
