import { SiteConfig } from "./types";
import hayfeverArticle from "./content/articles/hayfever.md?raw";
import sleepArticle from "./content/articles/sleep.md?raw";
import heatstrokeArticle from "./content/articles/heatstroke.md?raw";
import checkup2026Article from "./content/articles/checkup-2026.md?raw";

export const siteConfig: SiteConfig = {
  theme: {
    primaryColor: "#c9a96e",
    accentColor: "#c9a96e",
    backgroundColor: "#0d1b2a",
    navy: "#0d1b2a",
    navy2: "#1a2d42",
    navy3: "#253d56",
    silver: "#d0dce8",
    silver2: "#9ab0c4",
    silver3: "#5a7a94",
    white: "#f0f5fa",
  },
  navigation: {
    links: [
      { label: "About", href: "#about" },
      { label: "強み", href: "#strengths" },
      { label: "できること", href: "#services" },
      { label: "執筆サンプル", href: "#blog" },
      { label: "お問い合わせ", href: "#contact" },
    ],
  },
  hero: {
    tag: "現役薬剤師｜医療コンテンツ専門",
    title: "薬剤師が書く、<br>信頼できる<br><em>医療コンテンツ。</em>",
    avatar: {
      url: "/profile_icon_square.png",
      name: "薬剤師たぬぽん",
      objectPosition: "center",
    },
    subtext: "薬剤師8年の専門知識で、薬機法に配慮した医療コンテンツの執筆・監修・リライトを承ります。",
    ctas: {
      primary: { label: "お問い合わせ", href: "#contact" },
      secondary: { label: "サンプルを見る", href: "#blog" },
    },
  },
  marquee: [
    "医療記事執筆",
    "医療記事監修",
    "薬機法対応",
    "SEO記事制作",
    "リライト",
    "エビデンスベース",
  ],
  labels: {
    hero: "INTRO",
    about: "ABOUT",
    strengths: "STRENGTHS",
    services: "SERVICES",
    blog: "SAMPLES",
    contact: "CONTACT",
  },
  about: {
    title: "現役薬剤師が<br><em>責任を持って執筆</em>",
    tags: ["大阪府", "調剤薬局8年", "研修認定薬剤師", "医療記事執筆", "医療記事監修", "薬機法対応", "SEO対応"],
    textBlocks: [
      "はじめまして、薬剤師のたぬぽんです。大阪府内の調剤薬局で現役の薬剤師として勤務しながら、医療記事の執筆・監修・リライトを承っています。",
      "医療コンテンツの正確性は、現場で患者さんと向き合う薬剤師の知識によって担保されます。<em>添付文書・診療ガイドライン等の一次情報を必ず確認</em>し、薬機法に配慮した表現で、読み手に伝わる文章をお届けします。",
    ],
    highlight: "「薬剤師が作る」という信頼性を軸に、エビデンスベースで丁寧に制作します。",
  },
  stats: [
    { value: "8", label: "薬剤師\n経験年数" },
    { value: "4", label: "公開サンプル\n記事数" },
    { value: "100", label: "一次情報\n確認実施", suffix: "%" },
  ],
  strengths: {
    title: "選ばれる<br><em>4つの強み</em>",
    items: [
      {
        num: "01",
        title: "薬機法に配慮した表現",
        description: "PMDA添付文書・医療広告ガイドラインを確認し、薬機法上のリスクに配慮した表現で執筆・監修します。リスクのある表現は事前に修正提案を行います。",
      },
      {
        num: "02",
        title: "エビデンスベースの執筆",
        description: "診療ガイドライン・添付文書等の一次情報を必ず確認し、根拠を明確にしたうえで執筆・監修を行います。憶測や曖昧な情報は記載しません。",
      },
      {
        num: "03",
        title: "納期厳守",
        description: "本業との兼ね合いで稼働時間は変動しますが、余裕を持ったスケジュール管理を徹底し、お約束した納期は必ず守ります。",
      },
      {
        num: "04",
        title: "確実なコミュニケーション",
        description: "主に夜間・休日に集中して作業しております。メッセージは確認次第、順次ご返信いたします。ご相談段階での疑問もお気軽にどうぞ。",
      },
    ],
  },
  services: {
    title: "できること",
    items: [
      {
        id: "medical-writing",
        number: "01",
        icon: "pen-tool",
        title: "医療記事執筆",
        description: "現役薬剤師として、添付文書・診療ガイドライン等の一次情報を確認し、エビデンスに基づいた医療記事を執筆します。",
      },
      {
        id: "medical-supervision",
        number: "02",
        icon: "stethoscope",
        title: "医療記事監修",
        description: "ライター様が執筆された医療記事を、薬剤師の専門知識で監修。事実誤認・薬機法上のリスクをチェックし、修正提案を行います。",
      },
      {
        id: "rewrite",
        number: "03",
        icon: "refresh-cw",
        title: "リライト",
        description: "既存の医療記事をより正確に・読みやすくリライト。古くなった情報の更新や、薬機法上の表現調整も対応します。",
      },
      {
        id: "seo-writing",
        number: "04",
        icon: "trending-up",
        title: "SEO記事制作",
        description: "医療系のSEOキーワードを意識した記事構成・本文制作。検索意図に応えながら、専門性と正確性を両立した記事を提供します。",
      },
      {
        id: "web-dev",
        number: "05",
        icon: "layout",
        title: "Webサイト制作",
        description: "クリニック・薬局・医療職向けのWebサイト制作を準備中。医療現場を熟知した薬剤師ならではのデザインと表現でご提案予定です。",
        isSoon: true,
      },
    ],
  },
  blog: {
    title: "執筆サンプル",
    items: [
      {
        date: "2026.04.26",
        category: "健診・予防医療",
        title: "「あれ？去年と違う」が正解。2026年4月、健診の判定基準はこう変わりました",
        id: "checkup-2026",
        content: checkup2026Article,
      },
      {
        date: "2026.04.19",
        category: "アレルギー",
        title: "花粉症がつらい人へ。市販薬の選び方を薬の種類・眠気・飲む回数で比較",
        id: "hayfever",
        content: hayfeverArticle,
      },
      {
        date: "2026.04.18",
        category: "睡眠・医薬品",
        title: "【2026年版】睡眠薬の使い分けガイド｜不眠タイプ別・新世代の薬まで",
        id: "sleep",
        content: sleepArticle,
      },
      {
        date: "2026.04.16",
        category: "ガイドライン解説",
        title: "2024年熱中症診療ガイドライン改訂を読み解く ― 薬剤師の現場実装3ステップ",
        id: "heatstroke",
        content: heatstrokeArticle,
      },
    ],
  },
  contact: {
    eyebrow: "お気軽にどうぞ",
    title: "お問い合わせ",
    description: "医療記事の執筆・監修・リライトのご相談はこちらから。\n通常2〜3営業日以内にご返信させていただきます。",
    form: {
      placeholders: {
        name: "お名前",
        email: "メールアドレス",
        subject: "件名",
        message: "ご相談内容をご記入ください",
      },
      buttonText: "送信する",
      formActionUrl: "https://formspree.io/f/xqenkezq",
    },
  },
  footer: {
    logo: "薬剤師たぬぽん",
    copy: "現役薬剤師｜医療コンテンツ専門｜大阪府",
    links: [
      { label: "About", href: "#about" },
      { label: "強み", href: "#strengths" },
      { label: "できること", href: "#services" },
      { label: "執筆サンプル", href: "#blog" },
      { label: "お問い合わせ", href: "#contact" },
    ],
    socials: [
      { label: "X（Twitter）", href: "https://x.com/tanupon_web" },
    ],
  },
};
