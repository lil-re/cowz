function MintButton ({ data, mint }) {
    return (
        <div>
            <p className="card-text count">
                {data.totalSupply} / 200
            </p>
            <p className="card-text cost">
                Each Cow NFT costs {data.cost / 10**18} eth (excluding gas fees)
            </p>
            <p className="card-text">
                <button className="button button-green" onClick={mint}>
                    Mint your Cow
                </button>
            </p>
        </div>
      );
}

export default MintButton;
