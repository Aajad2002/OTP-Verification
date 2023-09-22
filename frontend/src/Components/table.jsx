import React from 'react'

const Table = ({ data,caption }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left text-gray-500">
            <caption className="text-xs p-2 text-bold text-gray-700 bg-yellow-300 uppercase">{caption}</caption>
                <thead className="text-xs text-gray-700 bg-yellow-300 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Word
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Frequencey
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((el) => {
                            return <tr className="border-b bg-gray-50 ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {el.word}
                                </th>
                                <td className="px-6 py-4">
                                    {el.frequency}
                                </td>

                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>

    )
}

export default Table