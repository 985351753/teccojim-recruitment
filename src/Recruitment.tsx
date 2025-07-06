import React, { useState } from 'react';
import { Users, Target, TrendingUp, Award, Mail, Phone, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Recruitment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleTestApplication = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJSの初期化
      emailjs.init('RoaBzIMf8wpq1WQMC');

      // テスト申し込みメールを送信
      const templateParams = {
        to_name: '採用担当者',
        from_name: 'ウェブサイト訪問者',
        message: 'かんたんテストの申し込みがありました。',
        timestamp: new Date().toLocaleString('ja-JP'),
        test_type: 'かんたんテスト',
        user_action: 'テスト申し込み'
      };

      await emailjs.send(
        'service_sop92wu',
        'template_01zxu8b',
        templateParams
      );

      setSubmitStatus('success');
    } catch (error) {
      console.error('メール送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              未来を創る
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                エンジニア募集
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              革新的なテクノロジーで社会課題を解決し、次世代のデジタル体験を共に創造しませんか
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleTestApplication}
                disabled={isSubmitting}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      送信中...
                    </>
                  ) : (
                    <>
                      かんたんテストをうけてみる
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
                詳細を見る
              </button>
            </div>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-green-100 flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                テスト申し込みを受け付けました。担当者よりご連絡いたします。
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-100">
                申し込みの送信に失敗しました。しばらく時間をおいて再度お試しください。
              </div>
            )}
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              なぜ私たちと働くのか
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              最先端技術と働きやすい環境で、あなたの可能性を最大限に引き出します
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "挑戦的なプロジェクト",
                description: "AI、IoT、ブロックチェーンなど最新技術を活用した革新的なプロジェクトに参画"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "成長機会",
                description: "継続的な学習支援と技術カンファレンス参加で、スキルアップを全面サポート"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "優秀なチーム",
                description: "業界トップクラスのエンジニアと協働し、互いに刺激し合える環境"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "充実した待遇",
                description: "競争力のある給与、柔軟な働き方、充実した福利厚生を提供"
              }
            ].map((item, index) => (
              <div key={index} className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              使用技術スタック
            </h2>
            <p className="text-xl text-gray-600">
              モダンで実績のある技術を組み合わせて開発しています
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "React", "TypeScript", "Node.js", "Python", "AWS", "Docker",
              "Kubernetes", "GraphQL", "PostgreSQL", "Redis", "TensorFlow", "Next.js"
            ].map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mx-auto mb-3"></div>
                <span className="font-semibold text-gray-800">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              募集ポジション
            </h2>
            <p className="text-xl text-gray-600">
              あなたのスキルと経験に合わせた多様なポジションをご用意
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "フロントエンドエンジニア",
                level: "中級〜上級",
                salary: "600万円〜1000万円",
                skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
                description: "ユーザー体験を重視したモダンなWebアプリケーションの開発"
              },
              {
                title: "バックエンドエンジニア",
                level: "中級〜上級",
                salary: "650万円〜1100万円",
                skills: ["Node.js", "Python", "AWS", "Docker"],
                description: "スケーラブルなAPI設計とマイクロサービスアーキテクチャの構築"
              },
              {
                title: "フルスタックエンジニア",
                level: "上級",
                salary: "700万円〜1200万円",
                skills: ["React", "Node.js", "AWS", "DevOps"],
                description: "フロントエンドからインフラまで幅広い技術領域をカバー"
              },
              {
                title: "DevOpsエンジニア",
                level: "中級〜上級",
                salary: "650万円〜1150万円",
                skills: ["Kubernetes", "AWS", "Terraform", "CI/CD"],
                description: "開発効率とシステム信頼性を向上させるインフラ自動化"
              },
              {
                title: "AIエンジニア",
                level: "中級〜上級",
                salary: "750万円〜1300万円",
                skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
                description: "機械学習モデルの開発から本番運用まで一貫して担当"
              },
              {
                title: "テックリード",
                level: "上級〜エキスパート",
                salary: "900万円〜1500万円",
                skills: ["アーキテクチャ設計", "チームマネジメント", "技術戦略"],
                description: "技術的な意思決定とチームの技術力向上をリード"
              }
            ].map((position, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {position.level}
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-600 mb-4">{position.salary}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{position.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {position.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
                  詳細を見る
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              働く環境・カルチャー
            </h2>
            <p className="text-xl text-blue-100">
              イノベーションを生み出す文化と環境
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "柔軟な働き方",
                description: "リモートワーク、フレックスタイム制度で、ワークライフバランスを重視"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "オープンな文化",
                description: "階層に関係なく意見を言い合える、フラットで風通しの良い組織"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "学習支援",
                description: "書籍購入費、研修費、カンファレンス参加費を会社が全額負担"
              }
            ].map((item, index) => (
              <div key={index} className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              お問い合わせ
            </h2>
            <p className="text-xl text-gray-600">
              ご質問やご相談がございましたら、お気軽にお問い合わせください
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Mail className="w-8 h-8" />,
                title: "メール",
                info: "recruit@company.com",
                description: "24時間受付、2営業日以内に返信"
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "電話",
                info: "03-1234-5678",
                description: "平日 9:00-18:00"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "オフィス",
                info: "東京都渋谷区...",
                description: "JR渋谷駅徒歩5分"
              }
            ].map((contact, index) => (
              <div key={index} className="text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  {contact.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
                <p className="text-lg font-semibold text-blue-600 mb-2">{contact.info}</p>
                <p className="text-gray-600">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">株式会社テックイノベーション</h3>
            <p className="text-gray-400 mb-8">
              テクノロジーで未来を創造する
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">プライバシーポリシー</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">利用規約</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">会社概要</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400">© 2024 Tech Innovation Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Recruitment;