import React, { useState, useEffect } from 'react';
import { Heart, Users, Brain, Home, Book, TrendingUp, Clock, MessageCircle, CheckCircle, ChevronDown, ChevronUp, Scaling as Seedling, Star, User, HelpingHand, Check } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, isOpen, onToggle }) => (
  <div className="mb-12">
    <button 
      className="w-full bg-green-100 hover:bg-green-200 cursor-pointer p-4 border-none text-left outline-none font-bold rounded-lg flex justify-between items-center transition-colors duration-300"
      onClick={onToggle}
    >
      <span>{title}</span>
      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<TestimonialProps> = ({ name, role, content }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg relative mb-8">
    <div className="absolute -top-4 left-5 text-6xl text-green-200 opacity-70 font-serif">"</div>
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
        <User className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-lg">{name}</h4>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
    <p className="text-gray-700">{content}</p>
  </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg h-full transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
    <div className="text-green-600 text-4xl mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-green-700 mb-3">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

const ProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => (
  <div className="mt-4">
    <div className="text-sm text-gray-600 mb-1">スキル成長</div>
    <div className="h-2 bg-gray-200 rounded-full">
      <div 
        className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

const Recruitment: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: ''
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Scroll to application section
    setTimeout(() => {
      const applicationSection = document.getElementById('application');
      if (applicationSection) {
        window.scrollTo({
          top: applicationSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white py-4 px-6 shadow-sm fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-green-600">てっこジム</div>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="#about" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">てっこジムとは</a>
            <a href="#features" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">特徴</a>
            <a href="#career-path" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">キャリアパス</a>
            <a href="#recruit" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">採用情報</a>
            <a href="#application" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">応募する</a>
          </nav>
          <a href="#application" className="hidden md:inline-block bg-green-600 text-white px-5 py-2 rounded-full font-bold hover:bg-green-700 transition duration-300">
            応募する
          </a>
        </div>
      </header>

      {/* Fixed CTA Button */}
      <a 
        href="#application" 
        className="fixed bottom-6 right-6 z-50 bg-orange-500 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:bg-orange-600 hover:transform hover:-translate-y-1 hover:shadow-xl animate-pulse shadow-lg flex items-center"
      >
        <span className="mr-2">最短5月から3名限定募集中！</span> 応募する
      </a>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-green-50 to-white" id="hero">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-800">
                子どもの成長と共に、<br />あなたも成長する
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-600 font-medium">
                てっこジムの<span className="text-green-600 font-bold">よろこびの循環</span>
              </p>
              <p className="text-lg mb-8 text-gray-700 max-w-xl">
                53種類の感覚統合遊具を使った個別運動療育施設で、
                子どもたちの「できた！」の瞬間に立ち会いながら、あなた自身も成長できる環境です。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#application" 
                  className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:bg-orange-600 hover:transform hover:-translate-y-1 hover:shadow-xl text-center shadow-lg"
                >
                  最短5月から3名限定募集中！ 応募する
                </a>
                <a 
                  href="#recruit" 
                  className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-6 py-3 rounded-full font-bold transition duration-300 text-center"
                >
                  採用情報を見る
                </a>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="w-full mb-5 rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://gensparkpublicblob.blob.core.windows.net/user-upload-image/v1/base64_upload/16aa05b75b0aa76d5d084ba6dd46aabd" 
                    alt="子どもの療育活動" 
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-lg shadow-lg md:max-w-xs hidden md:block">
                  <p className="text-lg font-bold text-green-600">「先生、見て！できた！」</p>
                  <p className="text-sm">子どもたちの小さな「できた！」の積み重ねが、大きな自信につながります。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-green-50" id="about">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-green-700 text-3xl mb-8 inline-block relative">
              てっこジムとは
              <div className="absolute bottom-[-10px] left-0 w-3/5 h-1 bg-green-500 rounded"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-8">
              てっこジムは、埼玉県杉戸町にある多機能型事業所です。感覚統合理論に基づいた遊具を活用し、一人ひとりの子どもが「自分でできた！」と喜べる体験を積み重ね、自信と自己肯定感を育んでいます。
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-20">
            <div className="md:w-1/2">
              <div className="w-full mb-5 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://gensparkpublicblob.blob.core.windows.net/user-upload-image/v1/base64_upload/d2962f92cbc3fa9ab4a6a786d5609596" 
                  alt="てっこジム施設外観" 
                  className="w-full rounded-lg"
                />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <div className="bg-green-200 text-green-700 font-semibold px-4 py-1 rounded-full text-sm inline-block w-fit mb-4">
                理念
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-6">「生きるよろこびを、すべての子どもたちへ」</h3>
              <p className="text-gray-700 mb-4">
                私たちが大切にしているのは、こどもたちが自ら挑戦し、楽しみながら成長できる場所を作ること。そして、ご家族が安心してその成長を見守り、ともに喜び合えるパートナーであることです。
              </p>
              <p className="text-gray-700 mb-4">
                てっこジムでは、専門資格を持つスタッフが40分間、感覚統合理論に基づく遊具を使い、お子さまのペースに合わせて丁寧に寄り添います。
              </p>
              <p className="text-gray-700">
                そして、子どもたちが成長する姿を支えるスタッフ自身も共に成長し、学び続ける。それが私たちの「よろこびの循環」です。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<HelpingHand />}
              title="マンツーマン療育"
              description="お子さま一人ひとりに担当のスタッフがつき、その子の特性や好みに合わせた個別プログラムを提供しています。"
            />
            <FeatureCard
              icon={<Brain />}
              title="感覚統合理論に基づく支援"
              description="遊びの中で感覚刺激を統合し、運動・認知・コミュニケーション能力を総合的に高めるアプローチを実践しています。"
            />
            <FeatureCard
              icon={<Home />}
              title="家族全体のサポート"
              description="お子さまの発達支援だけでなく、保護者の方々の不安や悩みにも寄り添い、家族全体の生活の質向上を目指します。"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white" id="features">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-green-700 text-3xl mb-8 inline-block relative">
              てっこジムの特徴
              <div className="absolute bottom-[-10px] left-0 w-3/5 h-1 bg-green-500 rounded"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-8">
              他にはない53種類の感覚統合遊具と専門スタッフによる個別支援で、子どもたちの可能性を最大限に引き出します。
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 mb-20">
            <div className="lg:w-1/2">
              <div className="w-full mb-5 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://gensparkpublicblob.blob.core.windows.net/user-upload-image/v1/base64_upload/2a68541f09cd09acff178e5cb98d935f" 
                  alt="施設内の遊具" 
                  className="w-full rounded-lg"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-green-200 text-green-700 font-semibold px-4 py-1 rounded-full text-sm inline-block w-fit mb-4">
                独自の強み
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-6">53種類の感覚統合遊具</h3>
              <p className="text-gray-700 mb-6">
                てっこジムには、トランポリン、ブランコ、クライミングウォール、ボルダリングなど、様々な感覚を刺激し、発達を促す遊具が揃っています。
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center text-white mr-4 flex-shrink-0 text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">前庭覚を刺激する遊具</h4>
                    <p className="text-gray-600">ブランコ、トランポリン、回転遊具などで平衡感覚や身体の位置感覚を育みます。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center text-white mr-4 flex-shrink-0 text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">固有感覚を育む遊具</h4>
                    <p className="text-gray-600">クライミングウォール、重りのあるボール、押し引き遊具で筋肉や関節の感覚を育てます。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center text-white mr-4 flex-shrink-0 text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">触覚を発達させる遊具</h4>
                    <p className="text-gray-600">様々な質感のマット、ボール、遊具を通して触覚の発達を促します。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="w-full mb-5 rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://gensparkpublicblob.blob.core.windows.net/user-upload-image/v1/base64_upload/f0f12c23bfadc3ef93c20541ec56967f" 
                alt="クライミングウォール" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="w-full mb-5 rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://gensparkpublicblob.blob.core.windows.net/user-upload-image/v1/base64_upload/647e6c4090d522d0fb89ef49b4b2c268" 
                alt="ボールプール" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="mt-16">
            <div className="bg-green-200 text-green-700 font-semibold px-4 py-1 rounded-full text-sm inline-block w-fit mb-4">
              専門性
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-6">専門家によるマンツーマン支援</h3>
            <p className="text-gray-700 mb-6">
              作業療法士、保育士、心理士など、様々な専門資格を持つスタッフが、お子さま一人ひとりに合わせた支援プログラムを提供します。
            </p>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
              <div className="w-full mb-5 rounded-xl overflow-hidden shadow-xl md:w-1/2">
                <img 
                  src="https://gensparkpublicblob.blob.core.windows.net/user-upload-image/v1/base64_upload/e47c9ae163d54e4f4c5ad7afd18fd8f8" 
                  alt="専門スタッフによる支援" 
                  className="w-full rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">40分間の個別療育</h4>
                      <p className="text-gray-600">お子さまのペースに合わせて、じっくりと丁寧に関わります。集団療育では得られない、一人ひとりに合わせた細やかな支援が可能です。</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">多職種連携</h4>
                      <p className="text-gray-600">様々な専門職の視点を組み合わせた総合的な支援を行います。各専門家が知識や経験を共有し、チームとして最適な支援を提供します。</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">保護者との連携</h4>
                      <p className="text-gray-600">定期的な面談や日々のフィードバックを通して、家庭での支援にもつながる関わりをします。子どもの成長を家族と共に喜び合える関係を築きます。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Path Section */}
      <section className="py-20 px-6 bg-green-50" id="career-path">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-green-700 text-3xl mb-8 inline-block relative">
              キャリアパス
              <div className="absolute bottom-[-10px] left-0 w-3/5 h-1 bg-green-500 rounded"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-8">
              てっこジムでは、様々なバックグラウンドを持つスタッフが、それぞれの強みを活かしながら成長しています。あなたも、あなたらしい成長の物語を紡いでみませんか。
            </p>
          </div>

          <CollapsibleSection
            title="未経験からのキャリアパス"
            isOpen={openSections['beginner']}
            onToggle={() => toggleSection('beginner')}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
                    <Seedling className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-green-700">入職初期（1年目）</h4>
                </div>
                <ul className="space-y-2 text-gray-700 ml-6 list-disc">
                  <li>基礎研修で支援の基本を学ぶ</li>
                  <li>先輩スタッフと共に支援を実践</li>
                  <li>感覚統合理論の基本を理解</li>
                  <li>子どもの観察力と関係構築力を養う</li>
                </ul>
                <ProgressBar percentage={40} />
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-green-700">中堅（2-3年目）</h4>
                </div>
                <ul className="space-y-2 text-gray-700 ml-6 list-disc">
                  <li>専門研修で支援スキルを深める</li>
                  <li>個別支援計画の立案に関わる</li>
                  <li>保護者対応の経験を積む</li>
                  <li>専門資格取得のサポートあり</li>
                </ul>
                <ProgressBar percentage={70} />
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
                    <Star className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-green-700">リーダー職（4年目〜）</h4>
                </div>
                <ul className="space-y-2 text-gray-700 ml-6 list-disc">
                  <li>後輩スタッフの育成・指導</li>
                  <li>チームリーダーとしての役割</li>
                  <li>事業所運営への参画</li>
                  <li>専門職としての地域貢献</li>
                </ul>
                <ProgressBar percentage={90} />
              </div>
            </div>

            <TestimonialCard
              name="佐藤 誠（28歳）"
              role="未経験から入職 / 現在3年目"
              content="「大学では全く別の分野を学んでいましたが、子どもが好きで福祉の仕事に興味を持ちました。入職当初は不安でしたが、先輩スタッフが丁寧に教えてくれたので安心してスタートできました。何より子どもたちの笑顔が私の原動力です。今では新しい療育プログラムを考案できるまでに成長し、後輩の指導も任されるようになりました。」"
            />
          </CollapsibleSection>

          <CollapsibleSection
            title="スキルアップの機会"
            isOpen={openSections['skillup']}
            onToggle={() => toggleSection('skillup')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-4">専門性を高める研修制度</h3>
                <ul className="space-y-2 text-gray-700 ml-6 list-disc">
                  <li>感覚統合理論に関する定期研修</li>
                  <li>外部講師を招いた専門セミナー</li>
                  <li>オンラインでの学習機会</li>
                  <li>資格取得支援制度</li>
                  <li>スキルに応じた段階的なスキルアップ</li>
                </ul>
                <div className="w-full mb-5 rounded-xl overflow-hidden shadow-xl mt-6">
                  <img 
                    src="https://gensparkpublicblob.blob.core.windows.net/user-upload-image/v1/base64_upload/aecd2041d31e99d0083b59d59c9e76da" 
                    alt="研修風景" 
                    className="w-full rounded-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-700 mb-4">多職種連携による学び</h3>
                <ul className="space-y-2 text-gray-700 ml-6 list-disc">
                  <li>作業療法士、保育士、心理士など様々な専門職との協働</li>
                  <li>多角的な視点でのケース検討会</li>
                  <li>他機関との連携から学ぶ機会</li>
                  <li>チーム間での知識・スキルの共有</li>
                  <li>専門職としての視野の拡大</li>
                </ul>
                <div className="w-full mb-5 rounded-xl overflow-hidden shadow-xl mt-6">
                  <img 
                    src="https://gensparkpublicblob.blob.core.windows.net/user-upload-image/v1/base64_upload/6f1812669427058b713f4dd729ee0983" 
                    alt="多職種連携" 
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>

            <TestimonialCard
              name="田中 美咲（25歳）"
              role="保育士 / 入職1年目"
              content="「保育園で3年働いた後、より子ども一人ひとりに向き合える環境を求めててっこジムに入職しました。初めは発達支援の専門知識が不安でしたが、先輩スタッフのサポートや研修が充実していて、安心して学ぶことができました。てっこジムでは『できない』ことではなく『どうすればできるようになるか』を常に考える文化があります。子どもたちの小さな成長を感じられることはもちろん、自分自身も日々学び、成長できる環境であることが最大の魅力です。保育士としての経験を活かしながら、新たな専門性も身につけられています。」"
            />
          </CollapsibleSection>

          <CollapsibleSection
            title="専門職としての働き方"
            isOpen={openSections['professional']}
            onToggle={() => toggleSection('professional')}
          >
            <h3 className="text-xl font-bold text-green-700 mb-6">キャリアステップ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-green-600 mb-2">◯ 専門スタッフ</h4>
                <p className="text-gray-700">実際の支援を担当し、専門性を活かして子どもたちの発達をサポート</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-green-600 mb-2">◯ チームリーダー</h4>
                <p className="text-gray-700">チームの支援計画立案や進捗管理、後輩の育成を担当</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-green-600 mb-2">◯ 児童発達支援管理責任者</h4>
                <p className="text-gray-700">事業所全体の支援方針の決定や関係機関との連携を担当</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-green-600 mb-2">◯ 施設長・管理者</h4>
                <p className="text-gray-700">施設全体の運営と管理、地域との関係構築を担当</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-green-700 mb-4">専門職の魅力</h3>
              <ul className="space-y-2 text-gray-700 ml-6 list-disc">
                <li>専門知識・技術を活かせる環境</li>
                <li>子どもの発達を長期的に見守れる喜び</li>
                <li>多様な専門職との協働による視野の拡大</li>
                <li>保護者や地域を含めた包括的支援</li>
                <li>理論と実践を融合した取り組み</li>
                <li>管理職としてのキャリア構築</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h4 className="font-bold text-green-700 mb-2">管理職への道</h4>
              <p className="text-gray-700">
                意欲と実績のあるスタッフには、管理職への道も開かれています。施設長や児童発達支援管理責任者として、さらなる責任とやりがいのある仕事に挑戦できます。
              </p>
            </div>

            <TestimonialCard
              name="山田 健太（32歳）"
              role="作業療法士 / 入職4年目 / チームリーダー"
              content="「前職は総合病院でしたが、子どもたちの成長に長期的に関われる環境を求めててっこジムに転職しました。ここでは目の前の症状改善だけでなく、その子の人生全体を見据えた支援ができることにやりがいを感じています。特に魅力的なのは遊具の豊富さ。53種類もの感覚統合遊具があるため、子どもたちの特性や好みに合わせた支援プログラムを組み立てられます。また、他職種のスタッフとの連携も密で、多角的な視点から子どもたちの支援を考えられる環境です。2年目からはチームリーダーを任され、後輩の育成や支援計画の立案も担当しています。自分の専門性を活かしながら、マネジメントスキルも身につけられるキャリアパスに満足しています。」"
            />
          </CollapsibleSection>
        </div>
      </section>

      {/* Target Section */}
      <section className="py-20 px-6 bg-white" id="target">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-green-700 text-3xl mb-8 inline-block relative">
              こんな方を待っています
              <div className="absolute bottom-[-10px] left-0 w-3/5 h-1 bg-green-500 rounded"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-8">
              てっこジムでは、子どもたちと共に成長したい方を募集しています。あなたに合った働き方で、子どもたちの可能性を広げる仕事をしませんか？
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-green-200 transition-all duration-300 hover:border-green-500 hover:bg-green-50 hover:transform hover:-translate-y-1">
              <h3 className="text-green-700 font-bold mb-3 text-xl">未経験・若手の方</h3>
              <div className="mb-4">
                <img 
                  src="https://gensparkpublicblob.blob.core.windows.net/user-upload-image/v1/base64_upload/539b03c5031f76db5093cdedfef10b32" 
                  alt="子どもと関わるスタッフ" 
                  className="w-full rounded-lg mb-4"
                />
              </div>
              <p className="text-gray-700 mb-4">
                子どもが好き、福祉や教育に興味がある方、未経験からでも歓迎します。
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">充実の研修制度で安心のスタート</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">先輩スタッフのサポートが手厚い</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">資格取得支援制度あり</p>
                </div>
              </div>
              <div className="mt-6">
                <button 
                  className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-6 py-3 rounded-full font-bold transition duration-300 inline-block"
                  onClick={() => toggleSection('beginner')}
                >
                  未経験からのキャリアパスを見る
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-green-200 transition-all duration-300 hover:border-green-500 hover:bg-green-50 hover:transform hover:-translate-y-1">
              <h3 className="text-green-700 font-bold mb-3 text-xl">保育士・教育関係者の方</h3>
              <div className="mb-4">
                <img 
                  src="https://gensparkpublicblob.blob.core.windows.net/user-upload-image/v1/base64_upload/8c529af90cd56a1c85d8135b4d93a72b" 
                  alt="子どもと関わるスタッフ" 
                  className="w-full rounded-lg mb-4"
                />
              </div>
              <p className="text-gray-700 mb-4">
                保育や教育の経験を活かしながら、より専門的なスキルを身につけたい方に最適です。
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">専門性を活かせる環境</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">感覚統合理論など新しい知識の習得</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">子ども一人ひとりとじっくり関われる</p>
                </div>
              </div>
              <div className="mt-6">
                <button 
                  className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-6 py-3 rounded-full font-bold transition duration-300 inline-block"
                  onClick={() => toggleSection('skillup')}
                >
                  スキルアップの機会を知る
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-green-200 transition-all duration-300 hover:border-green-500 hover:bg-green-50 hover:transform hover:-translate-y-1">
              <h3 className="text-green-700 font-bold mb-3 text-xl">経験者・専門職の方</h3>
              <div className="mb-4">
                <img 
                  src="https://gensparkpublicblob.blob.core.windows.net/user-upload-image/v1/base64_upload/e47c9ae163d54e4f4c5ad7afd18fd8f8" 
                  alt="子どもと関わるスタッフ" 
                  className="w-full rounded-lg mb-4"
                />
              </div>
              <p className="text-gray-700 mb-4">
                豊富な経験や専門知識を活かして、次世代を育てる重要な役割を担いませんか？
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">経験・専門性を存分に発揮できる</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">後進の育成にも関われる</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">多職種連携による新たな気づき</p>
                </div>
              </div>
              <div className="mt-6">
                <button 
                  className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-6 py-3 rounded-full font-bold transition duration-300 inline-block"
                  onClick={() => toggleSection('professional')}
                >
                  専門職としての働き方を見る
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruit Section */}
      <section className="py-20 px-6 bg-green-50" id="recruit">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-green-700 text-3xl mb-8 inline-block relative">
              採用情報
              <div className="absolute bottom-[-10px] left-0 w-3/5 h-1 bg-green-500 rounded"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-8">
              <span className="font-bold">最短5月からの新体制に向けて3名限定募集中！</span><br />
              子どもたちの成長と共に、あなた自身も成長できる環境で働きませんか？<br />
              正規職員および管理者も募集しています
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
            <h3 className="text-xl font-bold text-green-700 p-4 bg-green-50">募集要項</h3>
            
            <div className="space-y-0">
              <div className="flex flex-col md:flex-row border-b border-gray-200">
                <div className="bg-green-50 text-green-700 p-4 font-bold md:w-1/3">募集職種</div>
                <div className="p-4 md:w-2/3">
                  <ul className="list-disc ml-5 space-y-1">
                    <li>児童個別運動療育施設「てっこジム」スタッフ</li>
                    <li>フリースクール型放課後等デイサービス「やるみなてぃ」スタッフ</li>
                    <li className="font-semibold">正規職員および管理者も募集しています</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row border-b border-gray-200">
                <div className="bg-green-50 text-green-700 p-4 font-bold md:w-1/3">雇用形態</div>
                <div className="p-4 md:w-2/3">
                  <p>正社員、パートタイマー</p>
                  <p className="text-green-700 font-bold mt-1">※未経験・無資格の方も歓迎！人柄と意欲を重視します</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row border-b border-gray-200">
                <div className="bg-green-50 text-green-700 p-4 font-bold md:w-1/3">勤務地</div>
                <div className="p-4 md:w-2/3">
                  <p>てっこジム：埼玉県北葛飾郡杉戸町高野台南2-1-8 ナミキビル101</p>
                  <p>やるみなてぃ：埼玉県北葛飾郡杉戸町高野台南2-1-8 ナミキビル102</p>
                  <p className="text-gray-600 mt-1">（杉戸高野台駅から徒歩3分）</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row border-b border-gray-200">
                <div className="bg-green-50 text-green-700 p-4 font-bold md:w-1/3">給与（正社員）</div>
                <div className="p-4 md:w-2/3">
                  <p>一般職月給：200,000円〜（経験・スキル・業務範囲によりUP）</p>
                  <p>モデル給与：作業療法士3年目／年収400万円</p>
                  <p>管理職月給：300,000円〜</p>
                  <p>モデル給与：管理者・児発管兼務／年収500万円</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row border-b border-gray-200">
                <div className="bg-green-50 text-green-700 p-4 font-bold md:w-1/3">給与（パート）</div>
                <div className="p-4 md:w-2/3">
                  <p>時給：1,100円〜1,700円（資格・経験・スキルにより優遇）</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row">
                <div className="bg-green-50 text-green-700 p-4 font-bold md:w-1/3">待遇・福利厚生</div>
                <div className="p-4 md:w-2/3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>• 賞与年2回</div>
                    <div>• 昇給随時</div>
                    <div>• 社会保険完備</div>
                    <div>• 社食付き</div>
                    <div>• 交通費全額支給</div>
                    <div>• 資格取得支援制度</div>
                    <div>• 完全週休二日制</div>
                    <div>• 年間休日120日以上</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-700 mb-6">成長できる環境</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Book className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">充実の研修制度</h4>
                    <p className="text-gray-700">
                      入職後の基礎研修はもちろん、専門スキルを高めるための内部・外部研修が充実しています。オンライン研修も活用し、効率的に学べる環境です。
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">多職種連携による学び</h4>
                    <p className="text-gray-700">
                      作業療法士、保育士、心理士など様々な専門職のスタッフと協働することで、多角的な視点や知識を身につけることができます。
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">キャリアパスの明確化</h4>
                    <p className="text-gray-700">
                      個々の目標やスキルに合わせたキャリアパスを設定し、段階的なステップアップを支援します。資格取得支援制度も充実しています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-700 mb-6">働きやすい環境</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">ライフステージに合わせた働き方</h4>
                    <p className="text-gray-700">
                      子育て中の方も安心して働ける環境です。時短勤務や時間帯調整など、個々の事情に合わせた柔軟な働き方を応援します。
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">意見を尊重する文化</h4>
                    <p className="text-gray-700">
                      「まずやってみよう」という文化のもと、新しいアイデアや意見を尊重します。経験の浅いスタッフの意見も大切にする風土があります。
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">心身ともに健康な職場</h4>
                    <p className="text-gray-700">
                      社食の提供や休憩時間の確保など、スタッフの健康を大切にしています。また、メンタルヘルスケアにも配慮した職場環境づくりを心がけています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-12">
            <h3 className="text-xl font-bold text-green-700 mb-6">採用プロセス</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0 text-lg font-bold">1</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">応募</h4>
                  <p className="text-gray-700">応募フォームよりエントリー。</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0 text-lg font-bold">2</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">書類選考</h4>
                  <p className="text-gray-700">応募書類を拝見し、1週間以内に結果をご連絡します。</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0 text-lg font-bold">3</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">面接</h4>
                  <p className="text-gray-700">対面またはオンラインで面接を実施。あなたの強みや価値観、てっこジムへの期待などをお聞かせください。</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0 text-lg font-bold">4</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">職場見学（希望者）</h4>
                  <p className="text-gray-700">実際の職場の雰囲気や業務内容を体験いただけます。（面接前でも可能です）</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0 text-lg font-bold">5</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">内定・入社</h4>
                  <p className="text-gray-700">最終的な条件の調整後、内定となります。入社日は応相談で決定します。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-green-700 mb-8">
              最短5月からの新体制に向けて3名限定募集中！
            </p>
            <a 
              href="#application" 
              className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:bg-orange-600 hover:transform hover:-translate-y-1 hover:shadow-xl inline-block shadow-lg"
            >
              今すぐ応募する
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white" id="faq">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-green-700 text-3xl mb-8 inline-block relative">
              よくある質問
              <div className="absolute bottom-[-10px] left-0 w-3/5 h-1 bg-green-500 rounded"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-8">
              応募前に気になることがありましたら、こちらをご確認ください。
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <CollapsibleSection
              title="未経験でも働けますか？"
              isOpen={openSections['faq1']}
              onToggle={() => toggleSection('faq1')}
            >
              <p className="text-gray-700">
                はい、未経験の方も歓迎しています。入職後の研修制度が充実しており、先輩スタッフのサポートも手厚いので、安心してスタートできます。子どもが好きで、成長意欲のある方であれば、ぜひご応募ください。
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="資格がなくても応募できますか？"
              isOpen={openSections['faq2']}
              onToggle={() => toggleSection('faq2')}
            >
              <p className="text-gray-700">
                資格がなくても応募可能です。人柄と意欲を重視した採用を行っています。入職後に必要な知識やスキルは研修で身につけることができます。また、資格取得支援制度もありますので、働きながら資格を取ることも可能です。
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="パートタイムでの勤務は可能ですか？"
              isOpen={openSections['faq3']}
              onToggle={() => toggleSection('faq3')}
            >
              <p className="text-gray-700">
                はい、パートタイムでの勤務も可能です。週3日からの勤務や、短時間勤務など、ご希望に応じて柔軟に対応します。子育て中の方や、他の仕事と両立したい方も多く活躍しています。
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="研修制度について教えてください。"
              isOpen={openSections['faq4']}
              onToggle={() => toggleSection('faq4')}
            >
              <p className="text-gray-700">
                入職後は、基礎研修からスタートし、子どもたちへの関わり方、感覚統合理論、遊具の使い方など、段階的に学んでいきます。OJTとして先輩スタッフと一緒に支援に入ることで、実践的なスキルも身につけられます。また、定期的な内部研修や外部研修への参加機会もあり、継続的なスキルアップを支援しています。
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="キャリアアップの道筋はありますか？"
              isOpen={openSections['faq5']}
              onToggle={() => toggleSection('faq5')}
            >
              <p className="text-gray-700">
                明確なキャリアパスを用意しています。入職後は個別療育のスタッフからスタートし、経験やスキルに応じてリーダー職、児童発達支援管理責任者など、段階的にステップアップしていくことが可能です。また、専門的なスキルを磨きたい方には、資格取得支援や専門分野の研修参加など、個々の希望に合わせたキャリア形成を支援します。
              </p>
            </CollapsibleSection>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-20 px-6 bg-green-50" id="application">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-green-700 text-3xl mb-8 inline-block relative">
              応募フォーム
              <div className="absolute bottom-[-10px] left-0 w-3/5 h-1 bg-green-500 rounded"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-8">
              下記フォームからご応募ください。<br />
              見学希望・ご質問のみの方もお気軽にご連絡ください。
            </p>
          </div>

          {!formSubmitted ? (
            <div className="bg-white rounded-lg p-6 shadow-md">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    お名前 <span className="text-red-500 text-sm">必須</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200" 
                    required 
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    メールアドレス <span className="text-red-500 text-sm">必須</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    応募職種 <span className="text-red-500 text-sm">必須</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      '児童指導員', '保育士', '作業療法士', '理学療法士',
                      '言語聴覚士', '心理職', '事務員', '管理者', '児童発達支援管理責任者'
                    ].map((position) => (
                      <label 
                        key={position}
                        className={`bg-white border border-gray-300 rounded-lg p-3 flex items-center hover:bg-green-50 cursor-pointer transition-colors duration-200 ${
                          position === '児童発達支援管理責任者' ? 'col-span-2' : ''
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="position" 
                          value={position} 
                          onChange={handleInputChange}
                          className="mr-2" 
                          required 
                        />
                        {position}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-500 mb-4">送信後、簡単な適性確認をご案内します</p>
                  <button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    かんたんテストをうけてみる
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 shadow-md text-center">
              <div className="text-green-600 text-5xl mb-4">
                <CheckCircle className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">ありがとうございます！応募を受け付けました</h3>
              <p className="text-gray-700 mb-6">
                数日以内に担当者からご連絡いたします。<br />
                てっこジムでお会いできることを楽しみにしています！
              </p>
              <button 
                onClick={() => scrollToSection('hero')}
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition duration-300"
              >
                トップに戻る
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-16 pb-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold text-white mb-4">てっこジム</div>
              <p className="text-gray-300 max-w-sm">
                多機能型事業所てっこジムは、埼玉県杉戸町で感覚統合理論に基づく個別運動療育を提供しています。
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">施設情報</h3>
                <ul className="space-y-2">
                  <li><a href="#about" className="text-gray-300 hover:text-white transition duration-300">てっこジムとは</a></li>
                  <li><a href="#features" className="text-gray-300 hover:text-white transition duration-300">特徴</a></li>
                  <li><a href="#career-path" className="text-gray-300 hover:text-white transition duration-300">キャリアパス</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">採用情報</h3>
                <ul className="space-y-2">
                  <li><a href="#target" className="text-gray-300 hover:text-white transition duration-300">求める人材</a></li>
                  <li><a href="#recruit" className="text-gray-300 hover:text-white transition duration-300">募集要項</a></li>
                  <li><a href="#application" className="text-gray-300 hover:text-white transition duration-300">応募フォーム</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">所在地</h3>
                <ul className="space-y-2">
                  <li className="text-gray-300">
                    <span className="block">埼玉県北葛飾郡杉戸町高野台南2-1-8</span>
                    <span className="block">ナミキビル101・102</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2023 TECCO合同会社 All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Recruitment;