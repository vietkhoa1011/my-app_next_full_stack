export default function SectionTitle({ children, color }: { children: React.ReactNode; color: string }) {
    return (
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <span className={`w-1 h-8 bg-linear-to-b ${color} rounded-full`} />
            {children}
        </h2>
    );
}