function CowDescription ({ data }) {
    return (
        <div>
            <div className="card-text">
                <table>
                    <thead>
                        <tr>
                            <th>Trait type</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.cow.attributes.map((attribute) => (
                                <tr key={attribute.trait_type}>
                                    <td>{ attribute.trait_type }</td>
                                    <td>{ attribute.value }</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="card-text">
                <a className="button button-secondary" target="_blank" href={data.cow.image}>
                    Image
                </a>
            </div>

            <div className="card-text">
                <a className="button button-secondary" target="_blank" href={data.cow.metadata}>
                    Metadata
                </a>
            </div>
        </div>
    )
}

export default CowDescription
