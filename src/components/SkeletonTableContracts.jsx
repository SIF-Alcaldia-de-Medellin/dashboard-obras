const SkeletonTableContracts = ({className })=>{

    return (
    <div className={`rounded-2xl ${className}`}>
        <table className={`table-fixed border rounded-2xl overflow-hidden w-full animate-pulse`}>
            <thead className="bg-blue-sky-400 text-white paragraph font-bold uppercase sticky h-[88px]">
                <tr>
                    <th className="px-4 py-2 text-center"></th>
                    <th className="px-4 py-2 text-center"></th>
                    <th className="px-4 py-2 text-center"></th>
                    <th className="px-4 py-2 text-center"></th>
                    <th className="px-4 py-2 text-center"></th>
                    <th className="px-4 py-2 text-center"></th>
                    <th className="px-4 py-2 text-center"></th>
                    <th className="px-4 py-2 text-center"></th>
                    <th className="px-4 py-2 text-center"></th>
                </tr>
            </thead>
            <tbody>
                {[1,2,3,4,5,6,7,8].map((info, index)=>(
                    <tr 
                        key={index}
                        className={`${index % 2 == 0 ? "bg-blue-sky-100" : "bg-blue-sky-200"} h-[36px]`}
                    >
                        <td className="px-4 py-2 text-sm w-fit"></td>
                        <td className="px-4 py-2 text-sm max-w-xs truncate"></td>
                        <td className="px-4 py-2 text-sm"></td>
                        <td className="px-4 py-2 text-sm"></td>
                        <td className="px-4 py-2 text-sm"></td>
                        <td className="px-4 py-2 text-sm"></td>
                        <td className="px-4 py-2 text-sm text-right"></td>
                        <td className="px-4 py-2 text-sm text-right"></td>
                        <td className="px-4 py-2 text-sm max-w-3xs truncate"></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default SkeletonTableContracts;