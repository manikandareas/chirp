import Image from 'next/image';

export default function ChirpPoster() {
    return (
        <div className="hidden md:block border rounded-3xl shadow relative overflow-clip ">
            <Image
                className="object-cover object-center"
                alt="Chirp"
                fill={true}
                style={{
                    transform: 'rotateY(3.142rad)',
                }}
                src={
                    'https://images.unsplash.com/photo-1525770041010-2a1233dd8152?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
            />
        </div>
    );
}
