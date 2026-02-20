import React from 'react';

export default function About() {
    return (
        <div className="container py-5">
            <div className="row align-items-center">
                {/* Text Section */}
                <div className="col-md-6 mb-4 mb-md-0">
                    <h1 className="display-4 text-center text-md-start mb-4 fw-bold">Hakkımızda</h1>
                    <p className="lead text-muted mb-4">
                        Moda, tarz ve kaliteyi bir arada sunan <strong className="fw-bold" style={{ color: '#964B00' }}>Barscarf</strong>, kıyafet ve aksesuar alışverişinde benzersiz bir deneyim sunuyor. Müşterilerimize her sezonun en trend parçalarını sunarak, stilinizi tamamlamanıza yardımcı olmak için buradayız. Geniş ürün yelpazemizle, her tarza hitap eden modern ve şık seçenekler sunuyoruz.
                    </p>
                    <p className="lead text-muted mb-4">
                        Müşteri memnuniyeti bizim önceliğimizdir. Bu yüzden, her bir ürünümüzü titizlikle seçiyor, kaliteli malzemeler kullanıyor ve her yaşa uygun farklı tarz seçenekleriyle müşterilerimizin beklentilerini en iyi şekilde karşılıyoruz. Moda dünyasında öncü olma yolunda hızla ilerlerken, aynı zamanda müşteri odaklı yaklaşımımızla da fark yaratıyoruz.
                    </p>
                    <p className="lead text-muted mb-4">
                        Yalnızca şık ve kaliteli ürünler değil, aynı zamanda kusursuz bir alışveriş deneyimi de sunuyoruz. Güvenli ödeme sistemleri, hızlı kargo seçenekleri ve kolay iade politikamız ile alışverişinizi keyifli ve sorunsuz hale getiriyoruz.
                    </p>
                    <p className="lead text-muted mb-4">
                        Her yaştan ve her zevke hitap eden kıyafetlerimizi keşfedin ve kendinize yeni bir tarz yaratın! <strong className="fw-bold " style={{ color: '#964B00' }}>Barscarf</strong> ile her zaman şık ve rahat olmanın keyfini çıkarın.
                    </p>
                </div>

                {/* Image Section */}
                <div className="col-md-6 text-center">
                    <img
                        src="https://img.freepik.com/premium-photo/minimalistic-elegance-clean-promotional-space-luxury-boutique_981640-87223.jpg?w=740"
                        alt="Hakkımızda"
                        className="img-fluid rounded shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}
