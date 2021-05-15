import { Spinner, Table } from "evergreen-ui"


export const VariantPlayerScoreList = () => {
    const mockData = [
        {
            name: "tommi",
            score: 20
        },
        {
            name: "jallux",
            score: 222
        },
        {
            name: "ville",
            score: -23
        }

    ]

    return mockData ?
        <div>
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>{"Nimi"}</Table.TextHeaderCell>
                    <Table.TextHeaderCell>{"Pisteet"}</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {mockData.map((x, index) => {
                        return <Table.Row key={index}>
                            <Table.TextCell>{x.name}</Table.TextCell>
                            <Table.TextCell>{x.score}</Table.TextCell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
        : <Spinner style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} />

}