export default function SkeletonCard() {
    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
            <div className="w-full h-72 bg-gray-700" />
            <div className="p-3">
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto" />
            </div>
        </div>
    );
}