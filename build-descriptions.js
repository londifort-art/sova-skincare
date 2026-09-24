// Comprehensive procedure descriptions generator for SOVA SKINCARE
const fs = require('fs');
const path = require('path');

// We load the existing descriptions and expand with full body, injectables, waxing, and combo descriptions
const baseFile = path.join(__dirname, 'procedure-descriptions.js');

const descriptions = {
  // =================== CONSULTATIONS ===================
  "consult.1": {
    ru: {
      category: "Консультация",
      title: "Консультация косметолога",
      summary: "Индивидуальный подход к исследованию состояния вашей кожи и разработке персонального плана профессионального и домашнего ухода.",
      benefits: [
        "Определение истинного типа и текущего состояния кожи",
        "Индивидуальный подбор профессионального домашнего ухода",
        "Составление персонализированного плана салонных процедур",
        "Рекомендации по образу жизни и питанию для здоровья кожи"
      ],
      steps: [
        "Сбор анамнеза и выявление пожеланий",
        "Визуальная и тактильная диагностика состояния кожи",
        "Анализ состава текущей косметики клиента",
        "Разработка поэтапного плана коррекции и ухода"
      ],
      suitableFor: ["Для всех типов кожи", "При акне, постакне, розацеа", "При возрастных изменениях", "Для подбора грамотного домашнего ухода"]
    },
    lv: {
      category: "Konsultācija",
      title: "Kosmetologa konsultācija",
      summary: "Kosmetologa konsultācija – individuāla pieeja Tavas ādas izpētei un profesionāla kopšanas plāna izstrādei.",
      benefits: [
        "Precīza ādas tipa un aktuālā stāvokļa noteikšana",
        "Individuāla mājas kopšanas līdzekļu piemeklēšana",
        "Personalizēta salona procedūru plāna izveide",
        "Ieteikumi veselīgas ādas saglabāšanai ikdienā"
      ],
      steps: [
        "Anamnēzes un vēlmju noskaidrošana",
        "Ādas stāvokļa vizuāla un taktila diagnostika",
        "Esošās mājas kosmētikas analīze",
        "Pakāpeniska kopšanas un procedūru plāna sastādīšana"
      ],
      suitableFor: ["Visiem ādas tipiem", "Akne, postakne, rozācija", "Nogurušai un novājinātai ādai", "Pareizas ikdienas kopšanas izvēlei"]
    },
    en: {
      category: "Consultation",
      title: "Cosmetologist Consultation",
      summary: "A personalized, in-depth evaluation of your skin health to design a bespoke clinical and home care protocol.",
      benefits: [
        "Accurate assessment of skin type and current condition",
        "Tailored professional home care regimen recommendations",
        "Customized in-clinic treatment plan",
        "Expert lifestyle and skincare guidance for long-term health"
      ],
      steps: [
        "In-depth intake of skin history and personal concerns",
        "Visual and tactile skin diagnostics",
        "Evaluation of current skincare routine and products",
        "Comprehensive step-by-step treatment strategy"
      ],
      suitableFor: ["All skin types", "Acne, post-acne, rosacea", "Dull or aging skin", "Establishing an optimal skincare routine"]
    }
  },

  "consult.2": {
    ru: {
      category: "Консультация",
      title: "Первичная консультация + вводная процедура",
      summary: "Первый и важнейший шаг к здоровой, сияющей коже. Включает комплексную диагностику и мягкую адаптивную процедуру по потребностям кожи.",
      benefits: [
        "Глубокая диагностика и мгновенное улучшение состояния кожи",
        "Мягкое очищение и восстановление барьера кожи",
        "Подбор идеальных компонентов и домашней косметики",
        "Быстрый старт программы омоложения или лечения"
      ],
      steps: [
        "Подробная диагностика и анализ кожи",
        "Деликатное очищение и ферментативный или кислотный пилинг",
        "Глубокое увлажнение и восстанавливающая сыворотка",
        "Успокаивающая маска по типу кожи",
        "Финишный крем с SPF и персонализированные назначения"
      ],
      suitableFor: ["Новым клиентам студии", "При обезвоженности и потере тонуса", "Чувствительной и проблемной коже"]
    },
    lv: {
      category: "Konsultācija",
      title: "Pirmreizējā kosmetologa konsultācija + ievadprocedūra",
      summary: "Sākotnējā konsultācija + ievadprocedūra pēc ādas tipa un vajadzībām. Pirmais un būtisks solis ceļā uz veselīgu, sabalansētu un mirdzošu ādu.",
      benefits: [
        "Dziļa diagnostika apvienota ar tūlītēju kopšanu",
        "Maiga attīrīšana un ādas barjeras atjaunošana",
        "Ideālu kopšanas līdzekļu piemeklēšana",
        "Ātrs un drošs sākums ādas veselības uzlabošanai"
      ],
      steps: [
        "Ādas stāvokļa un anamnēzes diagnostika",
        "Maiga attīrīšana un pīlings",
        "Intensīva mitrināšana ar serumiem",
        "Nomierinoša un atjaunojoša maska",
        "Noslēdzošais krēms ar SPF un individuāls plāns"
      ],
      suitableFor: ["Jauniem klientiem", "Sausai, dehidrētai ādai", "Jutīgai un problemātiskai ādai"]
    },
    en: {
      category: "Consultation",
      title: "Initial Consultation + Introductory Treatment",
      summary: "The essential first step toward radiant, balanced skin. Combines detailed clinical diagnostics with a customized introductory facial treatment.",
      benefits: [
        "Comprehensive diagnosis combined with immediate skin rejuvenation",
        "Gentle purification and skin barrier restoration",
        "Tailored product recommendations matched to skin reactivity",
        "Effective start for clear, glowing skin"
      ],
      steps: [
        "Diagnostic intake and skin assessment",
        "Gentle cleansing and targeted enzyme/acid exfoliation",
        "Deep hydration and active regenerative serum infusion",
        "Soothing mask matched to skin needs",
        "Protective finishing cream with SPF & home care guide"
      ],
      suitableFor: ["First-time visitors", "Dehydrated and dull skin", "Sensitive or reactive skin types"]
    }
  },

  // =================== CLEANSING ===================
  "clean.1": {
    ru: {
      category: "Чистка лица",
      title: "Комплексная глубокая чистка лица",
      summary: "Авторская программа глубокого и бережного очищения, сочетающая аппаратные технологии и атравматичные техники для чистоты и ровной текстуры кожи.",
      benefits: [
        "Глубокое очищение пор без травматизации",
        "Удаление ороговевших клеток и комедонов",
        "Снятие воспалений и антибактериальный эффект",
        "Сужение пор и выравнивание микрорельефа кожи"
      ],
      steps: [
        "Кислотный или энзимный пилинг по типу кожи",
        "Ультразвуковой пилинг или алмазная микродермабразия",
        "Холодное гидрирование (размягчение пор без термонагрузки)",
        "Атравматичная мануальная дочистка",
        "Дарсонвализация (антибактериальное действие, регуляция себума)",
        "Успокаивающая себорегулирующая маска",
        "Регенерирующая сыворотка и защитный крем"
      ],
      suitableFor: ["Комедоны и черные точки", "Расширенные поры", "Комбинированная и жирная кожа", "Склонность к воспалениям"]
    },
    lv: {
      category: "Sejas tīrīšana",
      title: "Kombinētā dziļā sejas ādas tīrīšana",
      summary: "Mūsu autorprogramma dziļai un saudzīgai ādas attīrīšanai, kas apvieno vairākas tehnoloģijas un profesionālas tehnikas ādas tekstūras un svaiguma uzlabošanai.",
      benefits: [
        "Dziļa poru attīrīšana",
        "Atmirušo šūnu noņemšana",
        "Iekaisumu samazināšana",
        "Tīra, līdzena un svaiga āda",
        "Samazinātas poras un vienmērīgāks tonis"
      ],
      steps: [
        "Pīlings – skābju vai enzīmu, atkarībā no ādas tipa",
        "Ultraskaņas pīlings vai dimanta mikrodermabrāzija",
        "Aukstā tvaicēšana – poru atvēršana bez termiskas slodzes",
        "Manuāla attīrīšana – rūpīga un saudzīga komedonu likvidēšana",
        "Darsonvalizācija – antibakteriāla iedarbība un tauku dziedzeru regulēšana",
        "Maska – nomierinoša vai attīroša, pielāgota ādai",
        "Serums un noslēdzošais krēms aizsardzībai"
      ],
      suitableFor: ["Aizsprostotām porām", "Komedoniem", "Taukainai un kombinētai ādai", "Nevienmērīgai ādas tekstūrai"]
    },
    en: {
      category: "Facial Cleansing",
      title: "Complex Deep Facial Cleansing",
      summary: "Our signature protocol for deep yet gentle pore purification, uniting ultrasound exfoliation, diamond microdermabrasion, and soothing care.",
      benefits: [
        "Deep pore purification without trauma",
        "Removal of dead skin cells and blackheads",
        "Reduction of blemishes and oiliness",
        "Refined pores and smooth, refreshed texture"
      ],
      steps: [
        "Acid or enzymatic peeling tailored to skin type",
        "Ultrasonic peeling or diamond microdermabrasion",
        "Cold hydration to open pores without heat stress",
        "Delicate manual comedone extraction",
        "Darsonvalization for antibacterial protection and sebum control",
        "Soothing and balancing post-treatment mask",
        "Restorative serum and protective SPF cream"
      ],
      suitableFor: ["Congested pores", "Blackheads and whiteheads", "Oily and combination skin", "Uneven skin texture"]
    }
  },

  "clean.2": {
    ru: {
      category: "Чистка лица",
      title: "REGLOW (аппаратная чистка + глубокое увлажнение)",
      summary: "Комплексная аппаратная процедура, сочетающая мягкую эксфолиацию, глубокую аппаратную очистку и ультразвуковое введение активных сывороток для эффекта «стеклянной кожи».",
      benefits: [
        "Сияющий, свежий и отдохнувший вид кожи",
        "Глубокое очищение без шелушений и покраснений",
        "Насыщение влагой и антиоксидантами",
        "Идеальная процедура «на выход» с мгновенным результатом"
      ],
      steps: [
        "Деликатная эксфолиация и подготовка кожи",
        "Аппаратное вакуумное/ультразвуковое очищение пор",
        "Электропорация или сонофорез активного коктейля гиалуроновой кислоты и витаминов",
        "Альгинатная или гидрогелевая восстанавливающая маска",
        "Защитный барьерный уход"
      ],
      suitableFor: ["Обезвоженная, тусклая кожа", "Перед важными мероприятиями", "Чувствительная кожа, которой противопоказана травматичная чистка"]
    },
    lv: {
      category: "Sejas tīrīšana",
      title: "REGLOW (aparāttīrīšana + aparātmitrināšana)",
      summary: "REGLOW ir kompleksa sejas ādas kopšanas procedūra, kas apvieno maigu eksfoliāciju, aparāttīrīšanu un intensīvu aktīvo vielu ievadīšanu dziļai mitrināšanai.",
      benefits: [
        "Mirdzoša, gluda un svaiga āda bez kairinājuma",
        "Dziļa poru atbrīvošana un attīrīšana",
        "Intensīva šūnu mitrināšana ar aparāttehnoloģijām",
        "Ideāls tūlītējs efekts pirms svētkiem vai pasākumiem"
      ],
      steps: [
        "Ādas sagatavošana un maiga eksfoliācija",
        "Aparāttīrīšana un poru atbrīvošana",
        "Aktīvo mitrinošo vielu ievadīšana",
        "Nomierinoša un atjaunojoša maska",
        "Noslēdzošā aizsardzība un SPF"
      ],
      suitableFor: ["Nogurušai, blāvai ādai", "Dehidrētai ādai", "Jutīgai ādai bez agresīvām metodēm"]
    },
    en: {
      category: "Facial Cleansing",
      title: "REGLOW (Machine Cleansing + Deep Hydration)",
      summary: "A premium dual-action facial combining delicate machine purification with intensive transdermal infusion of active hydrators for the ultimate glow.",
      benefits: [
        "Instantly radiant, silky and luminous skin",
        "Pore purification without redness or peeling",
        "Deep intracellular moisture restoration",
        "Zero downtime — perfect before special events"
      ],
      steps: [
        "Skin preparation and gentle enzymatic polish",
        "Machine vacuum/ultrasound purification",
        "High-performance electroporation/sonophoresis hydration",
        "Restorative cooling mask",
        "Barrier renewal serum and protective SPF"
      ],
      suitableFor: ["Dehydrated, dull skin", "Event-prep glow", "Sensitive skin needing gentle refinement"]
    }
  },

  "clean.3": {
    ru: {
      category: "Чистка",
      title: "Комбинированная чистка спины",
      summary: "Профессиональная глубокая чистка кожи спины для устранения воспалений, комедонов и гиперкератоза.",
      benefits: [
        "Глубоко очищенные поры спины",
        "Уменьшение высыпаний и гиперкератоза",
        "Гладкая, ровная и ухоженная кожа",
        "Снижение избыточного выделения себума"
      ],
      steps: [
        "Очищение и антисептическая обработка",
        "Фруктовый пилинг или распаривающий гель",
        "Аппаратное и мануальное удаление комедонов",
        "Дарсонваль для антибактериального заживления",
        "Лечебная себорегулирующая маска",
        "Успокаивающий заживляющий крем"
      ],
      suitableFor: ["Высыпания и акне на спине", "Закупоренные поры и комедоны", "Перед летним сезоном и открытой одеждой"]
    },
    lv: {
      category: "Sejas un ķermeņa tīrīšana",
      title: "Muguras tīrīšana",
      summary: "Profesionāla muguras ādas tīrīšana – procedūra, kas paredzēta muguras ādas dziļai attīrīšanai, poru atbrīvošanai un ādas kvalitātes uzlabošanai.",
      benefits: [
        "Dziļi attīrītas muguras poras",
        "Samazināts liekais sebums un iekaisumi",
        "Gludāka ādas tekstūra un tīrs izskats",
        "Ādas komforta un veselības atjaunošana"
      ],
      steps: [
        "Muguras ādas izvērtēšana un attīrīšana",
        "Ādas sagatavošana un pīlings",
        "Manuāla un aparāta tīrīšana",
        "Darsonvalizācija antibakteriālai iedarbībai",
        "Nomierinoša un ārstnieciska maska",
        "Noslēdzošais aizsargkrēms"
      ],
      suitableFor: ["Aizsprostotām porām", "Izsitumiem muguras zonā", "Taukainai muguras ādai"]
    },
    en: {
      category: "Body Cleansing",
      title: "Combined Back Cleansing",
      summary: "A clinical purification treatment targeting back breakouts, congested pores, and rough skin texture for clean, smooth skin.",
      benefits: [
        "Deeply purified pores and cleared congestion",
        "Noticeable reduction in breakouts and inflammation",
        "Smoothed skin texture and sebum regulation",
        "Enhanced skin clarity and confidence"
      ],
      steps: [
        "Deep antiseptic cleansing",
        "Targeted chemical peel / softening gel",
        "Ultrasonic and manual extraction",
        "High-frequency antibacterial darsonvalization",
        "Calming botanical clay mask",
        "Soothing protective emulsion"
      ],
      suitableFor: ["Back acne and breakouts", "Congested pores", "Pre-vacation and open-back attire"]
    }
  },

  "clean.4": {
    ru: {
      category: "Чистка лица",
      title: "Чистка лица для подростков (до 18 лет)",
      summary: "Бережная профессиональная процедура для молодой кожи с индивидуальным подходом, снятием воспалений и обучением правильному домашнему уходу.",
      benefits: [
        "Мягкое очищение без стресса для молодой кожи",
        "Уменьшение количества воспалений и черных точек",
        "Предотвращение появления следов постакне и рубцов",
        "Рекомендации подростку по бережному домашнему уходу"
      ],
      steps: [
        "Оценка типа кожи и текущей стадии высыпаний",
        "Деликатное очищение специальными средствами для подростков",
        "Мягкое атравматичное очищение пор",
        "Антисептическая успокаивающая обработка",
        "Противовоспалительная маска",
        "Легкий увлажняющий крем с SPF и консультация"
      ],
      suitableFor: ["Подростковая проблемная кожа", "Юношеские угри и комедоны", "Избыточная жирность в Т-зоне"]
    },
    lv: {
      category: "Sejas tīrīšana",
      title: "Pusaudžu sejas ādas tīrīšana (līdz 18 g.v.)",
      summary: "Saudzīga profesionāla procedūra jaunai ādai, kas palīdz rūpīgi attīrīt poras, samazināt lieko sebumu un uzlabot ādas kopējo stāvokli.",
      benefits: [
        "Dziļi attīrītas poras bez traumatizācijas",
        "Samazināts liekais sebums un iekaisumi",
        "Tīrāks un vienmērīgāks ādas izskats",
        "Individuāli ieteikumi pareizai ikdienas kopšanai"
      ],
      steps: [
        "Ādas stāvokļa izvērtēšana",
        "Maiga attīrīšana",
        "Ādas sagatavošana un saudzīga poru tīrīšana",
        "Nomierinoša antibakteriāla maska",
        "Noslēdzošais krēms un SPF",
        "Ieteikumi ikdienas ādas kopšanai"
      ],
      suitableFor: ["Melnajiem un baltajiem komedoniem", "Pusaudžu problemātiskai ādai", "Pastiprinātai sebuma izdalīšanai"]
    },
    en: {
      category: "Facial Cleansing",
      title: "Teen Facial Cleansing (under 18)",
      summary: "A gentle, non-aggressive clinical protocol specifically tailored to adolescent skin to manage oiliness, clear blemishes, and establish healthy habits.",
      benefits: [
        "Pore purification designed specifically for teenage skin",
        "Reduction of active blemishes and excess shine",
        "Prevention of post-inflammatory hyperpigmentation",
        "Empowering education on proper daily routine"
      ],
      steps: [
        "Gentle assessment and sensitivity check",
        "Mild clarifying cleanse and softening",
        "Gentle, selective extraction",
        "Antibacterial healing calming mask",
        "Lightweight soothing hydrator and SPF protection",
        "Personalized teen home routine guidance"
      ],
      suitableFor: ["Teenage acne & congestion", "Excess oiliness in T-zone", "Young sensitive skin"]
    }
  },

  // =================== FACIAL MASSAGES ===================
  "fmsg.1": {
    ru: {
      category: "Массаж лица",
      title: "Миофасциальный массаж лица (90 мин)",
      summary: "Глубокая авторская методика моделирования овала лица, работы с глубокими мышечными зажимами, фасциями и фасциальным каркасом шеи и декольте.",
      benefits: [
        "Мощный безоперационный лифтинг-эффект",
        "Снятие мышечных спазмов и асимметрии лица",
        "Улучшение лимфотока и устранение утренней отечности",
        "Четкий угол нижней челюсти и расслабление зоны шеи"
      ],
      steps: [
        "Проработка шейно-воротниковой зоны и апоневроза головы",
        "Глубокотканный массаж фасций и мимических мышц",
        "Буккальная (интраоральная) или скульптурная проработка",
        "Лимфодренажные приемы для выведения застойной жидкости",
        "Завершающий успокаивающий и моделирующий уход"
      ],
      suitableFor: ["Птоз, брыли, нечеткий овал лица", "Склонность к отекам", "Мышечные спазмы, бруксизм", "Возрастные изменения"]
    },
    lv: {
      category: "Sejas masāža",
      title: "Miofasciālā sejas masāža (90 min)",
      summary: "Dziļa un strukturēta sejas muskuļu un fasciju masāža, kas atbrīvo no saspringuma un sniedz izteiktu sejas ovāla liftinga efektu.",
      benefits: [
        "Izteikts sejas ovāla liftings bez injekcijām",
        "Muskuļu spriedzes un asimetrijas mazināšana",
        "Spēcīga tūskas mazināšana un limfas attece",
        "Svaigs, atpūties un jauneklīgs sejas izskats"
      ],
      steps: [
        "Apkakles zonas un galvas aponeirozes sagatavošana",
        "Dziļo fasciju un mīmikas muskuļu manuāla modelēšana",
        "Skulpturāla ovāla un vaigu kaulu izstrāde",
        "Limfodrenāžas fāze liekā šķidruma izvadīšanai",
        "Noslēdzošais kopjošais lifts"
      ],
      suitableFor: ["Sejas kontūru noslīdēšanai", "Rīta tūskai", "Muskuļu saspringumam un stresam"]
    },
    en: {
      category: "Facial Massage",
      title: "Myofascial Facial Massage (90 min)",
      summary: "An intensive structural sculpting technique working deep within the facial fascia and musculature to relieve chronic tension and contour the jawline.",
      benefits: [
        "Powerful non-surgical lifting and firming effect",
        "Relief of chronic facial and jaw tension",
        "Intense lymphatic drainage eliminating puffiness",
        "Sculpted cheekbones and defined jaw contour"
      ],
      steps: [
        "Neck, shoulder and scalp aponeurosis tension release",
        "Deep fascial stretching and muscle contouring",
        "Sculptural tissue lifting maneuvers",
        "Rhythmic lymphatic flushing",
        "Harmonizing botanical serum and finish"
      ],
      suitableFor: ["Loss of jawline definition", "Facial puffiness & tension", "Anti-aging prevention"]
    }
  },

  "fmsg.2": {
    ru: {
      category: "Массаж лица",
      title: "Ритуал с классическим массажем лица (75 мин)",
      summary: "Расслабляющий уходовый ритуал, сочетающий классические массажные техники, глубокое увлажнение и ароматерапевтический релакс.",
      benefits: [
        "Улучшение микроциркуляции и здоровый румянец",
        "Снятие стресса и напряжения мимических мышц",
        "Увлажнение и питание кожи",
        "Повышение тургора и упругости"
      ],
      steps: [
        "Демакияж и мягкое очищение кожи",
        "Массаж лица, шеи и зоны декольте на питательном масле/креме",
        "Лимфодренажные и тонизирующие движения",
        "Увлажняющая маска для лица",
        "Финальный защитный крем"
      ],
      suitableFor: ["Сухая и уставшая кожа", "Стресс и усталость", "Для регулярного поддержания тонуса"]
    },
    lv: {
      category: "Sejas masāža",
      title: "Klasiskā sejas masāža un rituāls (75 min)",
      summary: "Klasiskā sejas, kakla un dekoltē masāža – relaksējoša un tonizējoša procedūra, kas uzlabo asinsriti, mazina muskuļu saspringumu un piešķir ādai veselīgu mirdzumu.",
      benefits: [
        "Uzlabota mikrocirkulācija un veselīgs tonis",
        "Muskuļu atslābināšana un stresa mazināšana",
        "Dziļa ādas barošana un mitrināšana",
        "Ādas tvirtuma un elastības veicināšana"
      ],
      steps: [
        "Ādas attīrīšana",
        "Sejas, kakla un dekoltē zonas manuāla masāža",
        "Drenējoša un relaksējoša iedarbība",
        "Mitrinoša maska",
        "Noslēdzošais krēms"
      ],
      suitableFor: ["Nogurušai un blāvai ādai", "Saspringumam sejas muskuļos", "Regulārai labsajūtai"]
    },
    en: {
      category: "Facial Massage",
      title: "Ritual with Classic Facial Massage (75 min)",
      summary: "A harmonious restorative ritual blending rhythmic facial, neck, and décolleté massage with indulgent nourishing skincare.",
      benefits: [
        "Boosted microcirculation and natural healthy radiance",
        "Deep relaxation and facial muscle decompression",
        "Intensive nourishing hydration",
        "Enhanced skin elasticity and suppleness"
      ],
      steps: [
        "Aromatic double cleansing",
        "Classic sculpting massage of face, neck, and décolleté",
        "Lymphatic rhythm drainage",
        "Hydrating infused mask",
        "Replenishing moisture barrier application"
      ],
      suitableFor: ["Stressed, tired skin", "Dry or depleted complexion", "Regular wellness maintenance"]
    }
  },

  "fmsg.3": {
    ru: {
      category: "Массаж лица",
      title: "Аппаратный вакуумный дренажный массаж лица (40 мин)",
      summary: "Бережный аппаратный вакуумный массаж для стимуляции оттока лимфы, устранения отеков, улучшения микроциркуляции и тонуса кожи.",
      benefits: [
        "Быстрое снятие отеков и пастозности лица",
        "Активация лимфотока и насыщение тканей кислородом",
        "Улучшение цвета лица и повышение эластичности",
        "Стимуляция синтеза коллагена"
      ],
      steps: [
        "Очищение и нанесение скользящей дренажной сыворотки",
        "Аппаратная вакуумная проработка лимфатических коллекторов и линий лица",
        "Скульптурирование зоны подбородка и скул",
        "Успокаивающий финишный уход"
      ],
      suitableFor: ["Отечность и «тяжелое» лицо", "Тусклый цвет кожи", "Застойные явления и плохой лимфоотток"]
    },
    lv: {
      category: "Sejas masāža",
      title: "Aparāta vakuuma drenāžas sejas masāža (40 min)",
      summary: "Aparātmetode maigai un efektīvai limfas atteces stimulēšanai, tūskas mazināšanai un sejas kontūru tonizēšanai.",
      benefits: [
        "Ātra tūskas un smaguma sajūtas mazināšana",
        "Limfas atteces un mikrocirkulācijas aktivizēšana",
        "Svaigāks un tonizētāks sejas tonis",
        "Ādas elastības un tonusa uzlabošana"
      ],
      steps: [
        "Attīrīšana un drenāžas līdzekļa uzklāšana",
        "Aparāta vakuuma masāža pa limfodrenāžas līnijām",
        "Zoda un vaigu kaulu kontūru apstrāde",
        "Nomierinošs noslēgums"
      ],
      suitableFor: ["Sejas tūskai", "Nogurušai sejas ādai", "Lēnai limfas cirkulācijai"]
    },
    en: {
      category: "Facial Massage",
      title: "Apparatus Vacuum Facial Drainage Massage (40 min)",
      summary: "A gentle machine-assisted vacuum massage engineered to stimulate lymphatic drainage, deflate puffiness, and oxygenate facial tissues.",
      benefits: [
        "Instant de-puffing and contour definition",
        "Accelerated lymphatic flushing and detoxification",
        "Enhanced tissue oxygenation and glow",
        "Gentle stimulation of collagen synthesis"
      ],
      steps: [
        "Purification and specialized slip drainage serum",
        "Calibrated vacuum passes along lymphatic pathways",
        "Jawline and cheek sculpting drainage",
        "Finishing soothing hydration"
      ],
      suitableFor: ["Facial puffiness", "Sluggish circulation", "Dull, congested skin"]
    }
  },

  // =================== PEELS ===================
  "peel.1": {
    ru: {
      category: "Пилинг",
      title: "Мятный пилинг PMP Peel",
      summary: "Инновационный двухфазный всесезонный пилинг с охлаждающим мятным эффектом для мгновенного сияния, сужения пор и обновления кожи без шелушений.",
      benefits: [
        "Мгновенный эффект свежести и сияния",
        "Сужение пор и осветление тона кожи",
        "Стимуляция обновления клеток без реабилитации",
        "Антисептическое и противовоспалительное действие"
      ],
      steps: [
        "Демакияж и обезжиривание кожи",
        "Нанесение двухфазного препарата PMP Peel с массажем",
        "Экспозиция и нейтрализация",
        "Успокаивающая восстанавливающая маска",
        "Крем с SPF для защиты от ультрафиолета"
      ],
      suitableFor: ["Тусклый цвет лица", "Расширенные поры и неровный рельеф", "Постакне и пигментация", "Все сезоны года"]
    },
    lv: {
      category: "Pīlings",
      title: "PMP PEEL 🌿 (piparmētru pīlings)",
      summary: "Saudzīga, bet efektīva profesionāla pīlinga procedūra, kas palīdz atjaunot ādas izskatu, uzlabot tās tekstūru un piešķirt sejai svaigu mirdzumu bez lobīšanās.",
      benefits: [
        "Tūlītējs svaiguma un mirdzuma efekts",
        "Uzlabota ādas tekstūra un gludums",
        "Samazinātas poras un vienmērīgāks tonis",
        "Nav nepieciešams rehabilitācijas periods"
      ],
      steps: [
        "Ādas sagatavošana un attīrīšana",
        "PMP preparāta uzklāšana ar iemasēšanu",
        "Iedarbības laiks un neitralizācija",
        "Nomierinoša un atjaunojoša maska",
        "Noslēdzošais aizsargkrēms ar SPF"
      ],
      suitableFor: ["Blāvai, nogurušai ādai", "Nevienmērīgai tekstūrai", "Pigmentācijai un paplašinātām porām"]
    },
    en: {
      category: "Chemical Peel",
      title: "Mint PMP Peel",
      summary: "An advanced biphasic peel with an invigorating mint sensation delivering instant glass-skin radiance, pore refinement, and cellular renewal with zero peeling.",
      benefits: [
        "Instant cooling freshness and luminous glow",
        "Refined pores and refined skin relief",
        "Accelerated cellular turnover without visible peeling",
        "Blemish prevention and antioxidant protection"
      ],
      steps: [
        "Cleansing and gentle degreasing",
        "Application and massage of active biphasic PMP formula",
        "Targeted exposure and neutralization",
        "Soothing restorative post-peel mask",
        "Protective barrier hydrator with broad-spectrum SPF"
      ],
      suitableFor: ["Dull, uneven complexion", "Enlarged pores", "Post-acne marks", "All seasons (zero downtime)"]
    }
  },

  "peel.2": {
    ru: {
      category: "Пилинг",
      title: "BioRePeelCl3 (двухфазный биоревитализирующий пилинг)",
      summary: "Знаменитый итальянский двухфазный пилинг-биоревитализант. Стимулирует выработку коллагена, подтягивает кожу, осветляет постакне и сужает поры.",
      benefits: [
        "Эффект биоревитализации без инъекций",
        "Лифтинг, упругость и гладкость кожи",
        "Осветление пигментных пятен и постакне",
        "Быстрый результат без долгого шелушения"
      ],
      steps: [
        "Глубокое очищение и обезжиривание",
        "Нанесение запатентованного состава BioRePeelCl3",
        "Внедрение активной формулы массажными техниками",
        "Нейтрализация и смывание",
        "Успокаивающая гидрогелевая маска и финиш с SPF"
      ],
      suitableFor: ["Снижение упругости кожи", "Пигментация и постакне", "Расширенные поры и жирность", "Мелкие морщины"]
    },
    lv: {
      category: "Pīlings",
      title: "BioRePeelCl3 divfāžu pīlings",
      summary: "Inovatīvs divfāžu pīlings ar biorevitalizācijas efektu bez adatām. Veicina kolagēna sintēzi, izlīdzina ādas toni un sniedz liftinga efektu.",
      benefits: [
        "Biorevitalizācijas un liftinga efekts bez injekcijām",
        "Gludāka un stingrāka āda",
        "Pigmentācijas un postaknes mazināšana",
        "Minimāls atjaunošanās laiks"
      ],
      steps: [
        "Attīrīšana un ādas sagatavošana",
        "BioRePeelCl3 uzklāšana",
        "Viegls masāžas posms aktīvai iekļūšanai",
        "Neitralizācija",
        "Nomierinoša maska un SPF aizsardzība"
      ],
      suitableFor: ["Tonne zaudējušai ādai", "Pigmentācijai", "Rētām pēc aknes", "Paplašinātām porām"]
    },
    en: {
      category: "Chemical Peel",
      title: "BioRePeelCl3 Biphasic Peel",
      summary: "The renowned Italian patented biphasic peel providing needle-free bio-revitalization. Stimulates fibroblast collagen synthesis while refining skin texture.",
      benefits: [
        "Non-injectable bio-revitalization effect",
        "Noticeable tightening and skin firmness",
        "Fading of pigmentation and post-acne blemishes",
        "Pore contraction with minimal social downtime"
      ],
      steps: [
        "Clinical degreasing prep",
        "Application of the biphasic BioRePeelCl3 solution",
        "Acupressure massage for active penetration",
        "Targeted removal and neutralization",
        "Intensive soothing biocellulose mask & SPF"
      ],
      suitableFor: ["Loss of elasticity", "Hyperpigmentation & post-acne", "Enlarged pores", "Fine lines"]
    }
  },

  "peel.3": {
    ru: {
      category: "Пилинг",
      title: "Jalupro Glow Peel",
      summary: "Пилинг с аминокислотами и гиалуроновой кислотой от легендарного швейцарского бренда Jalupro. Глубокое сияние, уплотнение кожи и мощная антиоксидантная защита.",
      benefits: [
        "«Вспышка красоты» — эффект мгновенного сияния",
        "Питание кожи незаменимыми аминокислотами",
        "Уплотнение тургора и разглаживание мелких морщинок",
        "Подходит даже для тонкой и чувствительной кожи"
      ],
      steps: [
        "Очищение и подготовка",
        "Нанесение состава Jalupro Glow Peel",
        "Деликатная экспозиция",
        "Увлажняющий аминокислотный компресс",
        "Восстанавливающий крем"
      ],
      suitableFor: ["Обезвоженная кожа", "Тусклый тон «курильщика» или усталость", "Первые признаки старения"]
    },
    lv: {
      category: "Pīlings",
      title: "Jalupro Glow Peel",
      summary: "Pīlings ar aminoskābēm un hialuronskābi no Šveices zīmola Jalupro. Dziļš mirdzums, ādas blīvuma un aizsargbarjeras atjaunošana.",
      benefits: [
        "Tūlītējs 'Glow' mirdzums un svaigums",
        "Ādas šūnu apgāde ar aminoskābēm",
        "Smalko krunciņu izlīdzināšana",
        "Maiga iedarbība arī jutīgai ādai"
      ],
      steps: [
        "Attīrīšana",
        "Jalupro Glow Peel uzklāšana",
        "Kontrolēta iedarbība",
        "Aminoskābju maska",
        "Aizsargājošs krēms"
      ],
      suitableFor: ["Sausai un blāvai ādai", "Noguruma pazīmēm", "Smalkajām krunciņām"]
    },
    en: {
      category: "Chemical Peel",
      title: "Jalupro Glow Peel",
      summary: "Formulated with Swiss amino acid clusters and hyaluronic complexes to reignite dermal vitality, lock in moisture, and impart a glass-skin sheen.",
      benefits: [
        "Immediate 'glass skin' luminosity",
        "Infuses dermal matrix with vital amino building blocks",
        "Plumping of fine dehydration lines",
        "Gentle formulation suitable for delicate complexions"
      ],
      steps: [
        "Gentle cleansing and pH prep",
        "Precision application of Jalupro Glow cocktail",
        "Measured exposure and neutral wash",
        "Amino-acid soothing treatment pack",
        "Nourishing finish with barrier lipids and SPF"
      ],
      suitableFor: ["Tired, dehydrated skin", "Pre-event radiance", "Early signs of aging"]
    }
  },

  "peel.4": {
    ru: {
      category: "Пилинг",
      title: "Миндальный / Азелаиновый / Молочный пилинг",
      summary: "Деликатные поверхностные фруктовые пилинги для бережной эксфолиации, осветления тона, нормализации работы сальных желез и лечения воспалений.",
      benefits: [
        "Мягкое отшелушивание без агрессии",
        "Противовоспалительное и антибактериальное действие",
        "Осветление пигментации и выравнивание тона",
        "Подходит для чувствительной кожи и при куперозе"
      ],
      steps: [
        "Очищение и подготовка",
        "Нанесение выбранной кислоты (миндальная, азелаиновая или молочная)",
        "Экспозиция и нейтрализация",
        "Успокаивающая восстанавливающая маска",
        "Финальный крем с SPF"
      ],
      suitableFor: ["Купероз и чувствительная кожа", "Акне и розацеа", "Жирный блеск и комедоны"]
    },
    lv: {
      category: "Pīlings",
      title: "Augļskābju pīlings (mandeļskābes, azelaīnskābes, pienskābes)",
      summary: "Augļskābju pīlings ir profesionāla sejas ādas kopšanas procedūra, kas apvieno mandeļskābes, azelaīnskābes un pienskābes iedarbību ādas atjaunošanai un nomierināšanai.",
      benefits: [
        "Maiga ādas atjaunošana bez lobīšanās",
        "Antibakteriāla un pretiekaisuma iedarbība",
        "Ādas toņa un reljefa izlīdzināšana",
        "Droša izvēle jutīgai un kuperozai ādai"
      ],
      steps: [
        "Ādas sagatavošana un attīrīšana",
        "Pīlinga šķīduma uzklāšana",
        "Iedarbības laika kontrole un neitralizācija",
        "Nomierinoša un atjaunojoša maska",
        "Noslēdzošais aizsargkrēms ar SPF"
      ],
      suitableFor: ["Jutīgai un apsārtušai ādai", "Akne un iekaisumiem", "Nevienmērīgam sejas tonim"]
    },
    en: {
      category: "Chemical Peel",
      title: "Almond / Azelaic / Lactic Acid Peel",
      summary: "Gentle fruit acid treatments designed to softly resurface, soothe rosacea-prone skin, clarify pores, and rebalance oil production.",
      benefits: [
        "Gentle cellular turnover with zero shedding",
        "Anti-inflammatory and antimicrobial action",
        "Brightened tone and balanced oil secretions",
        "Safe for sensitive and couperose-prone skin"
      ],
      steps: [
        "Balancing cleanse and lipid prep",
        "Application of tailored AHA/dicarboxylic solution",
        "Timed neutralization",
        "Anti-redness botanical recovery pack",
        "Broad-spectrum protective finish"
      ],
      suitableFor: ["Rosacea and sensitive skin", "Mild blemishes & redness", "Uneven skin tone"]
    }
  },

  // =================== WOW EFFECT ===================
  "wow.1": {
    ru: {
      category: "WOW Эффект",
      title: "GIGI Bioplasma терапия (сияние + лифтинг)",
      summary: "Восстанавливающая процедура для тусклой, усталой кожи с эффектом «как после отпуска». Насыщает клетки кислородом, выравнивает рельеф и придает выраженное сияние.",
      benefits: [
        "Мгновенный свежий и отдохнувший вид",
        "Улучшение микроциркуляции и оксигенации кожи",
        "Повышение плотности и упругости",
        "Длительное увлажнение и антиоксидантная защита"
      ],
      steps: [
        "Очищение и подготовка кожи",
        "Азазеловый пилинг Bioplasma",
        "Оживляющая сыворотка Bioplasma",
        "Пластифицирующая моделирующая маска",
        "Финальный защитный крем"
      ],
      suitableFor: ["Тусклая, «городская» кожа", "Хроническая усталость и стресс", "Перед важными событиями"]
    },
    lv: {
      category: "WOW Efekts",
      title: "GIGI Bioplasma (mirdzums + liftings)",
      summary: "GIGI Bioplasma – atjaunojoša sejas procedūra nogurušai un blāvai ādai ar efektu “kā pēc atvaļinājuma”. Piešķir ādai svaigumu, mirdzumu un uzlabo tās tonusu.",
      benefits: [
        "Tūlītējs atpūtušās ādas izskats un mirdzums",
        "Uzlabota šūnu apgāde ar skābekli",
        "Ādas tvirtuma un elastības atjaunošana",
        "Gludāks ādas mikroreljefs"
      ],
      steps: [
        "Ādas sagatavošana un attīrīšana",
        "Bioplasma pīlings",
        "Aktivizējošais serums",
        "Modelējoša maska",
        "Noslēdzošais aizsargkrēms"
      ],
      suitableFor: ["Nogurušai, blāvai ādai", "Pilsētas stresa ietekmētai ādai", "Pirms svētkiem"]
    },
    en: {
      category: "WOW Effect",
      title: "GIGI Bioplasma Therapy (Glow + Lifting)",
      summary: "A premier revitalizing treatment for fatigued, stressed skin delivering an effortless 'just returned from vacation' glow, firmness, and deep oxygenation.",
      benefits: [
        "Instant fresh, rested luminosity and tone",
        "Cellular oxygenation and energy boost",
        "Refined dermal density and elasticity",
        "Robust defense against oxidative urban stress"
      ],
      steps: [
        "Cleansing and bio-prep",
        "Bioplasma specialized acid conditioning",
        "Oxygen-activating revitalizing serum infusion",
        "Sculpting alginate envelope",
        "Restorative barrier cream finish"
      ],
      suitableFor: ["Dull, stressed urban skin", "Pre-event radiance", "Loss of skin vitality"]
    }
  },

  "wow.2": {
    ru: {
      category: "WOW Эффект",
      title: "Неинвазивная карбокситерапия + Bioplasma",
      summary: "Мощная синергетическая процедура: насыщение тканей углекислым газом CO₂ в сочетании с израильской терапией Bioplasma для максимального дренажа, детокса и лифтинга.",
      benefits: [
        "Максимальный детокс и выведение токсинов",
        "Мощный дренаж и устранение стойких отеков",
        "Яркий лифтинг и подтяжка овала",
        "Интенсивное сияние и разглаживание морщинок"
      ],
      steps: [
        "Очищение и деликатный пилинг",
        "Нанесение карбокси-геля и маски-активатора (выделение CO₂)",
        "Оксигенация тканей (эффект Бора)",
        "Внедрение сывороток Bioplasma",
        "Моделирующая маска и финишный уход"
      ],
      suitableFor: ["Выраженная отечность лица", "Сниженный тургор и дряблость", "Тусклая, стрессированная кожа"]
    },
    lv: {
      category: "WOW Efekts",
      title: "Bioplasma + Carboxy (detokss, drenāža, liftings)",
      summary: "GIGI Bioplasma + neinvazīvā karboksiterapija – intensīva atjaunojoša procedūra nogurušai, blāvai un tonusu zaudējušai ādai ar spēcīgu detoksa un liftinga efektu.",
      benefits: [
        "Izteikts detoksa un limfodrenāžas efekts",
        "Spēcīgs tūskas zudums un sejas ovāla liftings",
        "Dziļa šūnu apgāde ar skābekli",
        "Tūlītējs ādas mirdzums un tvirtums"
      ],
      steps: [
        "Attīrīšana un ādas sagatavošana",
        "Karboksiterapijas gēls un maska-aktivators",
        "Oglekļa dioksīda CO₂ reakcija un mikrocirkulācijas stimuls",
        "Bioplasma aktīvie serumi",
        "Modelējoša maska un aizsargkrēms"
      ],
      suitableFor: ["Tūskainai sejas ādai", "Pelēcīgam ādas tonim", "Nogurušai un tonusu zaudējušai ādai"]
    },
    en: {
      category: "WOW Effect",
      title: "Non-Invasive Carboxy Therapy + Bioplasma",
      summary: "The ultimate power duo: therapeutic transdermal CO₂ infusion paired with GIGI Bioplasma for deep lymphatic drainage, cellular oxygenation, and sculpted lifting.",
      benefits: [
        "Intense tissue detoxification and depuffing",
        "Immediate cellular oxygen burst via the Bohr effect",
        "Visibly contoured jawline and lifted skin",
        "Long-lasting revitalized radiance"
      ],
      steps: [
        "Cleansing and gentle enzymatic polish",
        "Transdermal carboxy gel and activator mask (CO₂ release)",
        "Intensive microcirculatory stimulation",
        "Bioplasma cellular energy serum infusion",
        "Tightening mask and protective barrier finish"
      ],
      suitableFor: ["Facial puffiness and water retention", "Dull, asphyxiated skin", "Slackened facial contours"]
    }
  },

  "wow.3": {
    ru: {
      category: "WOW Эффект",
      title: "Неинвазивная карбокситерапия + Массаж",
      summary: "Процедура с мгновенным WOW-эффектом: детоксикация и насыщение клеток кислородом с помощью CO₂ в сочетании с мануальным моделирующим массажем лица, шеи и декольте.",
      benefits: [
        "Снятие мышечных зажимов и глубокое расслабление",
        "Мощный дренаж и ликвидация отеков",
        "Свежее, подтянутое и сияющее лицо",
        "Разглаживание микрорельефа"
      ],
      steps: [
        "Глубокое очищение кожи",
        "Карбокситерапия CO₂ (активизация кровотока)",
        "Массаж лица, шеи и зоны декольте",
        "Успокаивающая увлажняющая маска",
        "Финальный защитный крем"
      ],
      suitableFor: ["Стресс и мышечное напряжение", "Отечность лица", "Снижение эластичности кожи"]
    },
    lv: {
      category: "WOW Efekts",
      title: "CARBOXY + MASĀŽA (WOW detoksa un drenāžas procedūra)",
      summary: "Neinvazīvā karboksiterapija + sejas, kakla un dekoltē masāža – “WOW” procedūra ar tūlītēju detoksa, drenāžas un atjaunojošu efektu.",
      benefits: [
        "Tūlītējs svaigums un sejas sārtums",
        "Muskuļu atslābināšana un limfas attece",
        "Dziļa ādas apgāde ar skābekli",
        "Liftinga un relaksācijas apvienojums"
      ],
      steps: [
        "Attīrīšana",
        "Karboksiterapijas uzklāšana un aktivizēšana",
        "Sejas, kakla un dekoltē manuālā masāža",
        "Nomierinoša mitrinoša maska",
        "Noslēdzošais krēms"
      ],
      suitableFor: ["Saspringtai un nogurušai ādai", "Tūskai", "Pirms svarīgiem notikumiem"]
    },
    en: {
      category: "WOW Effect",
      title: "Non-Invasive Carboxy Therapy + Massage",
      summary: "A signature WOW-effect treatment uniting transdermal CO₂ oxygenation with an sculpting manual massage of the face, neck, and décolleté.",
      benefits: [
        "Decompresses facial muscle tension and stress",
        "Accelerates lymphatic fluid removal",
        "Restores flushed, oxygen-rich healthy glow",
        "Improves elasticity and tissue tone"
      ],
      steps: [
        "Deep facial preparation",
        "Carboxytherapy CO₂ gel application and activation",
        "Sculptural massage of face, neck and décolleté",
        "Soothing hydro-calming mask",
        "Finishing protective emulsion"
      ],
      suitableFor: ["Stress-fatigued complexions", "Morning puffiness", "Pre-event revitalization"]
    }
  },

  "wow.4": {
    ru: {
      category: "WOW Эффект",
      title: "Неинвазивная карбокситерапия + Микротоки",
      summary: "Глубокий протокол омоложения: насыщение клеток кислородом углекислым газом в сочетании с микротоковой стимуляцией мышц и клеточного метаболизма.",
      benefits: [
        "Глубокий мышечный и тканевый лифтинг",
        "Стимуляция выработки АТФ в клетках кожи",
        "Дренаж, устранение пастозности и темных кругов",
        "Улучшение тонуса и плотности кожи"
      ],
      steps: [
        "Подготовка и очищение кожи",
        "Нанесение карбокситерапии CO₂",
        "Микротоковая терапия по активному проводящему гелю",
        "Регенерирующая маска",
        "Финишный уход"
      ],
      suitableFor: ["Дряблость и потеря контура", "Отечность вокруг глаз", "Уставшая, зрелая кожа"]
    },
    lv: {
      category: "WOW Efekts",
      title: "Mikrostrāvas + Carboxy therapy",
      summary: "Dziļš liftinga un ādas atjaunošanas protokols ar tūlītēju iedarbību, apvienojot karboksiterapijas skābekļa pieplūdi ar mikrostrāvu šūnu stimulāciju.",
      benefits: [
        "Dziļš muskuļu un audu liftings",
        "Šūnu enerģijas (ATF) ražošanas stimulēšana",
        "Tūskas un tumšo loku mazināšana",
        "Uzlabots sejas ovāls un elastība"
      ],
      steps: [
        "Ādas sagatavošana",
        "Karboksiterapijas iedarbība",
        "Aparāta mikrostrāvu terapija",
        "Atjaunojoša maska",
        "Noslēdzošais krēms"
      ],
      suitableFor: ["Noslīdējušam sejas ovālam", "Pietūkumam acu zonā", "Nogurušai un novecojošai ādai"]
    },
    en: {
      category: "WOW Effect",
      title: "Non-Invasive Carboxy + Microcurrents",
      summary: "A cutting-edge anti-aging synergy combining the cellular oxygen surge of carboxytherapy with low-level microcurrent electrical neuromodulation.",
      benefits: [
        "Cellular ATP stimulation by up to 500%",
        "Dramatic lifting of sagging facial tissues",
        "Rapid dissipation of stubborn fluid and eye bags",
        "Enhanced collagen architecture and firmness"
      ],
      steps: [
        "Enzymatic purification",
        "Transcutaneous CO₂ carboxy application",
        "Microcurrent multi-phase neuromuscular lifting",
        "Cellular recovery compress mask",
        "Peptide shield and SPF"
      ],
      suitableFor: ["Loss of muscle tone and elasticity", "Under-eye puffiness", "Mature and fatigued skin"]
    }
  },

  // =================== APPARATIVE & MEDER ===================
  "app.1": {
    ru: {
      category: "Аппаратная косметология",
      title: "Микротоковая терапия Overline Exential (Италия)",
      summary: "Итальянский 4-фазный протокол клеточного омоложения: дренаж, клеточная стимуляция, миолифтинг и трансдермальное внедрение активных компонентов.",
      benefits: [
        "Стимуляция выработки собственного коллагена и эластина",
        "Подтяжка мышц лица и восстановление тонуса",
        "Улучшение лимфодренажа и снятие отечности",
        "Глубокое проникновение омолаживающих сывороток"
      ],
      steps: [
        "1 фаза: Дренаж (выведение лишней жидкости)",
        "2 фаза: Клеточная стимуляция (активация синтеза АТФ)",
        "3 фаза: Миолифтинг (тренировка и тонизирование мимических мышц)",
        "4 фаза: Электропорация (введение активного мезококтейля)",
        "Завершающая маска и крем"
      ],
      suitableFor: ["Птоз и нечеткий контур", "Отечность и пастозность", "Мелкие морщины и снижение тонуса"]
    },
    lv: {
      category: "Aparātprocedūras",
      title: "Mikrostrāvu terapija OVERLINE EXENTIAL (Itālija)",
      summary: "4 fāžu sejas atjaunošanas procedūra ar Itālijas vadošajām tehnoloģijām: limfodrenāža, šūnu stimulācija, mioliftings un aktīvo vielu ievadīšana.",
      benefits: [
        "Muskuļu tonusa un sejas kontūru atjaunošana",
        "Šūnu metabolisma un kolagēna sintēzes veicināšana",
        "Efektīva tūskas un zilo loku mazināšana",
        "Tūlītējs tonusa un tvirtuma pieaugums"
      ],
      steps: [
        "1. fāze: Drenāža (šķidruma aizplūde)",
        "2. fāze: Šūnu stimulācija (enerģijas atjaunošana)",
        "3. fāze: Mioliftings (muskuļu tonizēšana)",
        "4. fāze: Aktīvo vielu ievadīšana dziļākajos slāņos",
        "Noslēdzošā maska un krēms"
      ],
      suitableFor: ["Tonusa zudumam", "Sejas tūskai", "Novecošanās profilaksei"]
    },
    en: {
      category: "Apparative Aesthetics",
      title: "Overline Exential Microcurrent Therapy (Italy)",
      summary: "Italian-engineered 4-phase microcurrent technology: lymphatic drainage, bio-cellular recharge, myofacial lifting, and transdermal active infusion.",
      benefits: [
        "Re-educates sagging facial muscles for sculpted tone",
        "Boosts natural adenosine triphosphate (ATP) production",
        "Significantly eliminates fluid retention and puffiness",
        "Deep delivery of nourishing bioactive concentrates"
      ],
      steps: [
        "Phase 1: Lymphatic drainage sweep",
        "Phase 2: Cellular bio-stimulation",
        "Phase 3: Deep muscular re-education (myolifting)",
        "Phase 4: Transdermal active cocktail infusion",
        "Restorative recovery mask and defense cream"
      ],
      suitableFor: ["Sagging facial contour", "Puffiness & dark circles", "Loss of skin bounce and tone"]
    }
  },

  "app.2": {
    ru: {
      category: "Аппаратная косметология",
      title: "Миостимуляция лица",
      summary: "«Фитнес для мышц лица». Воздействие импульсными токами стимулирует мышечный каркас, возвращая четкие очертания скулам и овалу лица.",
      benefits: [
        "Укрепление мышечного каркаса лица",
        "Подтяжка «второго подбородка» и брылей",
        "Улучшение кровообращения и питания тканей",
        "Естественный эффект омоложения без инъекций"
      ],
      steps: [
        "Очищение и нанесение токопроводящего геля",
        "Установка электродов по моторным точкам мышц",
        "Регулировка интенсивности импульсов",
        "Тонизирующая маска и защитный крем"
      ],
      suitableFor: ["Снижение мышечного тонуса лица", "Гравитационный птоз", "Нечеткий контур нижней трети"]
    },
    lv: {
      category: "Aparātprocedūras",
      title: "Sejas miostimulācija",
      summary: "Mērķtiecīga sejas muskuļu trenēšana ar elektriskajiem impulsiem, atgriežot stingru ovālu un vaigu kaulu izteiksmīgumu.",
      benefits: [
        "Sejas muskuļu karkasa nostiprināšana",
        "Dubultzoda un kontūru noslīdējuma mazināšana",
        "Asinsrites un vielmaiņas uzlabošana audos",
        "Dabisks liftinga efekts bez adatām"
      ],
      steps: [
        "Attīrīšana un vadītājgēla uzklāšana",
        "Elektrodu novietošana muskuļu motorajos punktos",
        "Impulsu intensitātes individuāla pielāgošana",
        "Tonizējoša maska un krēms"
      ],
      suitableFor: ["Sejas muskuļu vājumam", "Gravitācijas ptozei", "Dubultzodam"]
    },
    en: {
      category: "Apparative Aesthetics",
      title: "Facial Myostimulation",
      summary: "Passive gym training for facial muscles. Precise electrical impulses tone lax muscle fibers, elevating the cheeks and sculpting the jawline.",
      benefits: [
        "Re-tones slackened facial muscle groups",
        "Lifts jowls and minimizes double chin appearance",
        "Accelerates vascular flow and nutrient delivery",
        "Natural muscle-derived tightening effect"
      ],
      steps: [
        "Skin prep and conductive gel application",
        "Electrode placement over specific motor trigger points",
        "Calibrated rhythmic muscle stimulation",
        "Soothing collagen mask and finish"
      ],
      suitableFor: ["Facial muscle sagging", "Double chin and jowls", "Non-invasive face-firming"]
    }
  },

  "app.3": {
    ru: {
      category: "Аппаратная косметология",
      title: "Мультиполярный RF-лифтинг лица (Дренаж + RF + LED)",
      summary: "Комплексная процедура, сочетающая радиочастотный прогрев дермы, вакуумный дренаж и фототерапию LED для мощного синтеза нового коллагена и подтяжки кожи.",
      benefits: [
        "Стимуляция образования новых коллагеновых волокон",
        "Мгновенное сокращение растянутых волокон и подтяжка кожи",
        "Улучшение контура овала и уплотнение тургора",
        "LED-терапия для выравнивания тона и омоложения"
      ],
      steps: [
        "Очищение и нанесение контактного геля",
        "Вакуумно-дренажная подготовка тканей",
        "Мультиполярный RF-прогрев до терапевтической температуры (40-42°C)",
        "Светотерапия красным и инфракрасным спектром LED",
        "Охлаждающая восстанавливающая маска"
      ],
      suitableFor: ["Дряблость и потеря упругости", "Морщины на лице, шее и декольте", "Птоз и нечеткий овал"]
    },
    lv: {
      category: "Aparātprocedūras",
      title: "RF liftings (Drenāža + RF + LED)",
      summary: "Kompleksa sejas kopšanas procedūra, kas apvieno drenāžas tehniku, radiofrekvences (RF) liftingu un LED gaismas terapiju ādas tvirtuma atjaunošanai.",
      benefits: [
        "Sejas ādas tvirtuma un blīvuma uzlabošana",
        "Vizuāli izteiktāks sejas ovāls",
        "Smalko krunciņu mazināšana",
        "Gludāka, jauneklīgāka ādas tekstūra"
      ],
      steps: [
        "Ādas sagatavošana un kontaktgēla uzklāšana",
        "Drenāžas fāze",
        "Radiofrekvences sildīšana kolagēna stimulācijai",
        "LED gaismas terapija",
        "Nomierinoša noslēguma maska un krēms"
      ],
      suitableFor: ["Atslābušai ādai", "Grumbiņām sejā, kaklā un dekoltē", "Sejas ovāla izplūdumam"]
    },
    en: {
      category: "Apparative Aesthetics",
      title: "Multipolar RF Facial Lifting (Drainage + RF + LED)",
      summary: "Triple-action thermal rejuvenation combining controlled radiofrequency dermal heating, mechanical vacuum drainage, and photobiomodulation LED therapy.",
      benefits: [
        "Stimulates deep neocollagenesis and elastin contraction",
        "Immediate tightening of loose skin tissue",
        "Refines jawline contour and firming of neck & décolleté",
        "LED light therapy for cellular repair and tone uniformity"
      ],
      steps: [
        "Antiseptic cleansing and glide medium application",
        "Pulsed drainage sweep",
        "Multipolar RF heating to therapeutic window (40-42°C)",
        "Concurrent LED phototherapy wavelength exposure",
        "Cooling peptide recovery pack"
      ],
      suitableFor: ["Skin laxity and thinning", "Facial wrinkles and neck bands", "Preventing gravitational sagging"]
    }
  },

  "meder.1": {
    ru: {
      category: "Meder Beauty Science",
      title: "Протоколы Meder Beauty Science (Швейцария)",
      summary: "Швейцарская неинвазивная нейрокосмецевтика мирового уровня. Протоколы: Hydra-Fill (глубокое увлажнение), Lipo-Oval (липолифтинг второго подбородка), Arma-Lift (гравитационный лифтинг), Red-Apax (купероз и розацеа).",
      benefits: [
        "Эффект медицинских инъекций без единого укола",
        "Физиологичное воздействие на глубокие слои кожи",
        "Клинически доказанная безопасность и эффективность",
        "Идеальное решение при противопоказаниях к инъекциям"
      ],
      steps: [
        "1. Энергетическое очищение",
        "2. Энзимный пилинг-гоммаж",
        "3. Антиоксидантная сыворотка",
        "4. Активный концентрат по проблеме (лифтинг, липолиз, увлажнение)",
        "5. Окклюзионная биоцеллюлозная маска",
        "6. Финишный крем-протектор"
      ],
      suitableFor: ["Морщины и потеря тонуса", "Второй подбородок и отечность", "Обезвоженная кожа", "Розацеа и покраснения"]
    },
    lv: {
      category: "Meder Beauty Science",
      title: "MEDER BEAUTY SCIENCE procedūra (Šveice)",
      summary: "Meder Beauty Science – Šveices klases “premium” kosmētikas zīmols ar zinātniski pamatotām, augsti efektīvām procedūrām bez injekcijām (Hydra-Fill, Lipo-Oval, Arma-Lift, Red-Apax).",
      benefits: [
        "Injekciju līmeņa rezultāts bez dūrieniem un sāpēm",
        "Zinātniski pierādītas Šveices biotehnoloģijas",
        "Nav rehabilitācijas perioda",
        "Mērķtiecīga iedarbība: mitrināšana, liftings vai kapilāru stiprināšana"
      ],
      steps: [
        "Enerģētiska attīrīšana",
        "Enzīmu pīlings",
        "Antioksidantu serums",
        "Mērķtiecīgs aktīvais koncentrāts",
        "Biocelulozes ietīšanas maska",
        "Aizsargājošs noslēdzošais krēms"
      ],
      suitableFor: ["Grumbām un tonusa trūkumam", "Dubultzodam", "Kuperozei un rozācijai", "Dehidrētai ādai"]
    },
    en: {
      category: "Meder Beauty Science",
      title: "Meder Beauty Science Protocols (Switzerland)",
      summary: "Swiss dermatological neuro-cosmeceuticals delivering clinical injection-grade results non-invasively: Hydra-Fill, Lipo-Oval, Arma-Lift, and Red-Apax.",
      benefits: [
        "Needle-free alternative to aesthetic injectables",
        "Scientifically validated peptide and microbiome complexes",
        "Zero trauma, bruising, or recovery period",
        "Targeted solutions for wrinkles, jowls, dehydration, or rosacea"
      ],
      steps: [
        "Step 1: Energy preparatory cleansing",
        "Step 2: Enzymatic micro-exfoliation mask",
        "Step 3: Antioxidant priming serum",
        "Step 4: Active targeted peptide concentrate infusion",
        "Step 5: Occlusive stretch-fabric biocellulose mask",
        "Step 6: Protective derma-sealing cream"
      ],
      suitableFor: ["Facial wrinkling and volume loss", "Heavy lower face / jowls", "Dryness & sensitivity", "Rosacea"]
    }
  },

  // =================== INJECTABLES ===================
  "inj.1": {
    ru: {
      category: "Инъекционная косметология",
      title: "Dermapen (микроигольчатая терапия + мезококтейль)",
      summary: "Фракционная микроигольчатая терапия аппаратом Dermapen. Стимулирует естественную регенерацию, выработку собственного коллагена и доставляет мезококтейль на заданную глубину.",
      benefits: [
        "Улучшение текстуры кожи и сужение пор",
        "Сглаживание рубцов постакне и мелких морщинок",
        "Повышение плотности и тургора кожи",
        "Осветление пигментных пятен и ровный тон"
      ],
      steps: [
        "Очищение и антисептическая обработка",
        "Нанесение индивидуального мезококтейля",
        "Микроигольчатая обработка стерильным одноразовым картриджем Dermapen",
        "Успокаивающая охлаждающая маска",
        "Регенерирующий крем с высоким SPF"
      ],
      suitableFor: ["Рубцы постакне", "Расширенные поры", "Дряблость и морщины", "Неровный рельеф кожи"]
    },
    lv: {
      category: "Skaistuma injekcijas",
      title: "Dermapen – mikroadatu terapija",
      summary: "Dermapen mikroadatu terapija – moderna ādas atjaunošanas procedūra, kuras laikā ar īpaši smalkām adatām tiek veidoti kontrolēti mikrokanāli, ievadot mezokokteili.",
      benefits: [
        "Uzlabota ādas tekstūra un reljefs",
        "Vizuāli mazākas poras un gludāka āda",
        "Postaknes rētu un smalko krunciņu mazināšana",
        "Dabiskas kolagēna sintēzes stimulēšana"
      ],
      steps: [
        "Ādas attīrīšana un antiseptiska apstrāde",
        "Aktīvās vielas / mezokokteiļa uzklāšana",
        "Mikroadatu terapija ar Dermapen aparātu",
        "Nomierinoša un atjaunojoša maska",
        "Noslēdzošais aizsargkrēms ar SPF"
      ],
      suitableFor: ["Postaknes rētām", "Paplašinātām porām", "Smalkām krunciņām", "Blāvai un novājinātai ādai"]
    },
    en: {
      category: "Injectable Aesthetics",
      title: "Dermapen Microneedling + Mesococktail",
      summary: "Fractional precision microneedling creating controlled micro-channels to jumpstart natural collagen induction and deliver active mesotherapy cocktails.",
      benefits: [
        "Noticeable smoothing of acne scarring and uneven texture",
        "Significant pore contraction",
        "Enhanced dermal density and elasticity",
        "Lightened post-inflammatory hyperpigmentation"
      ],
      steps: [
        "Clinical cleansing and antiseptic sanitization",
        "Layering of custom targeted mesotherapy concentrate",
        "Dermapen motorized micro-puncturing pass",
        "Post-procedure calming biocellulose mask",
        "Restorative barrier cream with broad-spectrum SPF"
      ],
      suitableFor: ["Acne scars & post-inflammatory marks", "Enlarged pores", "Fine lines", "Uneven skin tone"]
    }
  },

  "inj.2": {
    ru: {
      category: "Инъекционная косметология",
      title: "Экзосомы VTech System (Dermapen)",
      summary: "Прорыв в регенеративной эстетической медицине: терапия экзосомами и полинуклеотидами. Запускает клеточную перезагрузку, обновление ДНК клеток кожи и мощный омолаживающий отклик.",
      benefits: [
        "Интенсивное омоложение на клеточном уровне",
        "Быстрое восстановление после микротравм",
        "Повышение упругости, эластичности и плотности кожи",
        "Яркое здоровое сияние и разглаживание морщин"
      ],
      steps: [
        "Глубокая очистка и антисептическая подготовка",
        "Нанесение препарата VTech System с экзосомами и полинуклеотидами",
        "Фракционное микроигольчатое введение аппаратом Dermapen",
        "Экзосомная успокаивающая маска",
        "Защитный барьерный крем с SPF"
      ],
      suitableFor: ["Возрастные изменения и дряблость кожи", "Постакне и рубцовые деформации", "Стрессированная, уставшая кожа"]
    },
    lv: {
      category: "Skaistuma injekcijas",
      title: "Exosomes VTech System (Dermapen)",
      summary: "Exosomes VTech System – progresīva ādas atjaunošanas procedūra, kas apvieno Dermapen mikroadatu terapiju ar eksosomu un polinukleotīdu kompleksu šūnu atjaunošanai.",
      benefits: [
        "Intensīva šūnu līmeņa reģenerācija",
        "Uzlabots ādas tvirtums un elastība",
        "Gludāka ādas tekstūra un samazinātas poras",
        "Izteikts ādas mirdzums un veselīgs tonis"
      ],
      steps: [
        "Ādas attīrīšana un antiseptiska apstrāde",
        "Aktīvā VTech System eksosomu preparāta uzklāšana",
        "Dermapen mikroadatu ievadīšana",
        "Nomierinoša eksosomu maska",
        "Atjaunojošs krēms ar SPF"
      ],
      suitableFor: ["Nogurušai un novājinātai ādai", "Tvirtuma zudumam", "Postaknes izmaiņām un rētām"]
    },
    en: {
      category: "Injectable Aesthetics",
      title: "Exosomes VTech System (Dermapen)",
      summary: "A revolutionary regenerative breakthrough uniting fractional microneedling with pure synthetic exosomes and polynucleotides for advanced cellular repair.",
      benefits: [
        "Cellular reprogramming and tissue regeneration",
        "Dramatic restoration of dermal elasticity and tightness",
        "Refinement of complex post-acne scarring",
        "Profound healthy radiance and vitality"
      ],
      steps: [
        "Cleansing and antiseptic preparation",
        "Topical application of sterile VTech exosome complex",
        "Fractional Dermapen delivery into targeted dermis",
        "High-potency exosome recovery compress",
        "Regenerative seal with broad-spectrum SPF"
      ],
      suitableFor: ["Accelerated skin aging", "Atrophic acne scars", "Chronically fatigued or thin skin"]
    }
  },

  "inj.3": {
    ru: {
      category: "Инъекционная косметология",
      title: "Neauvia Hydro Deluxe (2.5 ml)",
      summary: "Премиальный швейцарский биоревитализант с чистейшей гиалуроновой кислотой и микрогранулами гидроксиапатита кальция (CaHA) для глубокого увлажнения и выработки нового коллагена.",
      benefits: [
        "Длительное увлажнение и уплотнение дермы",
        "Стимуляция выработки эндогенного коллагена I и III типа",
        "Эффект сияния и бархатистой гладкости",
        "Улучшение тургора кожи лица, шеи и зоны декольте"
      ],
      steps: [
        "Консультация и демакияж",
        "Аппликационная анестезия (по желанию)",
        "Папульное или линейное введение препарата Neauvia Hydro Deluxe",
        "Антисептическая обработка и заживляющий крем"
      ],
      suitableFor: ["Сухая, атоничная кожа", "Мелкоморщинистый тип старения", "Фотостарение и восстановление после солнца"]
    },
    lv: {
      category: "Skaistuma injekcijas",
      title: "Neauvia Hydro Deluxe (2.5 ml)",
      summary: "Šveices 'premium' klases biorevitalizants ar tīru hialuronskābi un kalcija hidroksilapatīta mikrosfērām ilgstošai mitrināšanai un kolagēna sintēzei.",
      benefits: [
        "Ilgstoša un dziļa audu mitrināšana",
        "Paša organisma kolagēna sintēzes stimulēšana",
        "Tūlītējs ādas elastības un blīvuma pieaugums",
        "Dabisks un veselīgs mirdzums"
      ],
      steps: [
        "Ādas sagatavošana un dezinfekcija",
        "Aplikācijas anestēzija pēc izvēles",
        "Preparāta mikroinjekcijas",
        "Nomierinoša un atjaunojoša kopšana"
      ],
      suitableFor: ["Dehidrētai un sausai ādai", "Elastības zudumam", "Smalkajām krunciņām"]
    },
    en: {
      category: "Injectable Aesthetics",
      title: "Neauvia Hydro Deluxe (2.5 ml)",
      summary: "A premium Swiss bio-revitalizer combining ultra-pure hyaluronic acid with calcium hydroxyapatite (CaHA) micro-particles for cellular hydration and sustained neocollagenesis.",
      benefits: [
        "Sustained deep dermal reservoir hydration",
        "Stimulates type I and III collagen synthesis",
        "Plumps superficial dehydration lines",
        "Imparts healthy, supple bounce to face and neck"
      ],
      steps: [
        "Consultation and skin prep",
        "Optional topical numbing application",
        "Micro-papular injection across targeted dermal matrix",
        "Post-injection soothing regenerative emulsion"
      ],
      suitableFor: ["Dehydrated, thinning skin", "Crepey texture on neck and décolleté", "Solar elastosis recovery"]
    }
  },

  "inj.7": {
    ru: {
      category: "Инъекционная косметология",
      title: "Полинуклеотиды PDRN (2 ml)",
      summary: "Препараты на основе фрагментов ДНК молок лосося (PDRN). Восстанавливают поврежденные клетки, борются с воспалениями, рубцами, выпадением волос и омолаживают периорбитальную зону.",
      benefits: [
        "Истинное клеточное восстановление на уровне ДНК",
        "Улучшение микроциркуляции и ангиогенеза",
        "Осветление темных кругов под глазами",
        "Сглаживание рубцов и ускорение заживления"
      ],
      steps: [
        "Консультация и дезинфекция зоны",
        "Индивидуальный выбор техники введения (лицо, веки, шея, кожа головы)",
        "Введение микропапулами",
        "Заживляющий крем"
      ],
      suitableFor: ["Темные круги и морщины вокруг глаз", "Постакне и атрофические рубцы", "Выпадение волос", "Дряблость шеи"]
    },
    lv: {
      category: "Skaistuma injekcijas",
      title: "Polinukleotīdi PDRN (2 ml)",
      summary: "Bioreģenerācijas preparāts uz PDRN DNS molekulu bāzes. Dziļi atjauno šūnu struktūru, mazina iekaisumus, rētas un atjauno jutīgo zonu ap acīm.",
      benefits: [
        "Audu reģenerācija šūnu DNS līmenī",
        "Zilo riņķu un maisiņu mazināšana zem acīm",
        "Rētu un postaknes izlīdzināšana",
        "Kolagēna un elastīna atjaunošanās"
      ],
      steps: [
        "Dezinfekcija un sagatavošana",
        "Mikroinjekcijas izvēlētajā zonā",
        "Nomierinoša apstrāde"
      ],
      suitableFor: ["Acu zonai un ziliem riņķiem", "Postaknes rētām", "Kakla un dekoltē atslābumam"]
    },
    en: {
      category: "Injectable Aesthetics",
      title: "Polynucleotides PDRN (2 ml)",
      summary: "Bio-regenerative polynucleotides derived from purified salmon DNA. Heals micro-damage, triggers cellular repair, addresses under-eye hollows, and treats scarring.",
      benefits: [
        "Genuine DNA-level cellular repair and regeneration",
        "Promotes capillary angiogenesis and tissue perfusion",
        "Diminishes under-eye hollows and dark coloration",
        "Smooths fibrotic scarring and accelerates healing"
      ],
      steps: [
        "Clinical sterilization",
        "Targeted micro-papular delivery to eye contour, face or neck",
        "Post-treatment cooling recovery barrier"
      ],
      suitableFor: ["Under-eye darkness & crepey skin", "Acne scars", "Thinning neck tissue", "Scalp hair revitalisation"]
    }
  },

  // =================== BODY & LIPOZERO ===================
  "bmsg.1": {
    ru: {
      category: "Массажи тела",
      title: "Классический массаж тела (60 мин)",
      summary: "Универсальный массаж всего тела для снятия мышечных спазмов, нормализации кровообращения, снятия стресса и восстановления тонуса.",
      benefits: [
        "Снятие мышечных зажимов и усталости в спине",
        "Улучшение циркуляции крови и лимфы",
        "Глубокое физическое и эмоциональное расслабление",
        "Повышение общего тонуса организма"
      ],
      steps: [
        "Разминание шейно-воротниковой зоны и спины",
        "Проработка мышц ног и рук",
        "Лимфодренажные поглаживания",
        "Восстанавливающий финиш"
      ],
      suitableFor: ["Мышечные боли и усталость", "Сидячий образ жизни", "Хронический стресс"]
    },
    lv: {
      category: "Ķermeņa procedūras",
      title: "Klasiskā ķermeņa masāža (60 min)",
      summary: "Klasiskā visa ķermeņa masāža, kas atslābina muskuļus, mazina saspringumu mugurā un veicina vispārēju organisma tonusu un labsajūtu.",
      benefits: [
        "Muskuļu sasprindzinājuma mazināšana",
        "Asinsrites un limfas atteces uzlabošana",
        "Muguras un plecu sāpju atvieglošana",
        "Vispārēja relaksācija un spēku atjaunošana"
      ],
      steps: [
        "Muguras un plecu daļas masāža",
        "Kāju un roku muskuļu izstrāde",
        "Nomierinošs un atslābinošs noslēgums"
      ],
      suitableFor: ["Saspringtiem muskuļiem", "Sēdoša darba darītājiem", "Noguruma mazināšanai"]
    },
    en: {
      category: "Body Treatments",
      title: "Classic Body Massage (60 min)",
      summary: "A restorative full-body Swedish massage designed to decompress muscular tightness, elevate circulation, and banish daily physical fatigue.",
      benefits: [
        "Relief of back, neck, and shoulder tension",
        "Improved blood flow and tissue oxygenation",
        "Deep somatic relaxation and cortisol reduction",
        "Restored muscular flexibility and comfort"
      ],
      steps: [
        "Full spinal and shoulder mobilization",
        "Deep tissue kneading of legs and glutes",
        "Harmonizing rhythmic relaxation finish"
      ],
      suitableFor: ["Muscle stiffness and fatigue", "Desk workers", "General physical rejuvenation"]
    }
  },

  "bmsg.2": {
    ru: {
      category: "Массажи тела",
      title: "Расслабляющий массаж всего тела и головы (90 мин)",
      summary: "Ароматерапевтический ритуал глубокой релаксации, восстанавливающий психоэмоциональное равновесие, снимающий бессонницу и зажимы головы и шеи.",
      benefits: [
        "Глубокий антистресс-эффект и перезагрузка нервной системы",
        "Снятие головных болей и напряжения в височной зоне",
        "Улучшение качества сна",
        "Мягкая, напитанная маслами кожа тела"
      ],
      steps: [
        "Мягкое прогревание и релакс-массаж спины",
        "Массаж ног, стоп и рук",
        "Массаж волосистой части головы и шейного отдела",
        "Ароматерапевтический отдых"
      ],
      suitableFor: ["Хроническая усталость и стресс", "Нарушения сна", "Головные боли напряжения"]
    },
    lv: {
      category: "Ķermeņa procedūras",
      title: "Relaksējošā visa ķermeņa masāža (90 min)",
      summary: "Maiga un nomierinoša masāža visam ķermenim un galvai, kas atbrīvo no stresa, uzlabo miegu un dāvā dziļu harmonijas sajūtu.",
      benefits: [
        "Dziļš antistresa un relaksācijas efekts",
        "Saspringuma mazināšana galvas un kakla zonā",
        "Miega kvalitātes un labsajūtas uzlabošana",
        "Ādas lutināšana ar barojošām eļļām"
      ],
      steps: [
        "Maiga ķermeņa masāža ar aromātiskajām eļļām",
        "Kāju un pēdu relaksācija",
        "Galvas un kakla masāža",
        "Mierpilns atjaunošanās noslēgums"
      ],
      suitableFor: ["Stresam un pārslodzei", "Miega traucējumiem", "Pilnīgai atpūtai"]
    },
    en: {
      category: "Body Treatments",
      title: "Relaxing Full Body & Head Massage (90 min)",
      summary: "An indulgent sensory escape combining flowing whole-body massage strokes with craniosacral scalp techniques to melt away chronic mental and physical stress.",
      benefits: [
        "Complete nervous system decompression and stress relief",
        "Alleviation of scalp tension and tension headaches",
        "Restores deep, restful sleep patterns",
        "Nourishes dry skin with botanical aromatherapy elixirs"
      ],
      steps: [
        "Warm oil full-body relaxation glide",
        "Gentle leg and foot reflexology touch",
        "Soothing head, scalp, and temple tension release",
        "Restorative grounding silence"
      ],
      suitableFor: ["Burnout and nervous tension", "Sleep disturbances", "Holistic self-care seekers"]
    }
  },

  "bmsg.4": {
    ru: {
      category: "Массажи тела",
      title: "Антицеллюлитный массаж тела (60 мин)",
      summary: "Интенсивный ручной массаж проблемных зон (бедра, ягодицы, живот) для расщепления фиброзных спаек, выведения застойной лимфы и уплотнения кожи.",
      benefits: [
        "Уменьшение выраженности целлюлита и сглаживание бугристости",
        "Уменьшение объемов в сантиметрах",
        "Улучшение микроциркуляции и тонуса кожи",
        "Стимуляция обмена веществ в жировой ткани"
      ],
      steps: [
        "Разогрев тканей дренажными движениями",
        "Интенсивная ручная лепка и выжимания проблемных зон",
        "Лимфодренажный дренаж",
        "Антицеллюлитный завершающий крем"
      ],
      suitableFor: ["Целлюлит любой локализации", "Снижение упругости кожи", "Задержка жидкости в тканях"]
    },
    lv: {
      category: "Ķermeņa procedūras",
      title: "Anticelulīta masāža ķermenim (60 min)",
      summary: "Intensīva manuāla masāža problemātiskajām zonām (gurni, augšstilbi, vēders), kas sašķeļ celulīta šūnas un aktivizē limfas atteci.",
      benefits: [
        "Celulīta vizuāla mazināšana un ādas izlīdzināšana",
        "Apjomu samazināšanās centimetros",
        "Ādas tvirtuma un tonusa uzlabošana",
        "Vielmaiņas aktivizācija problemātiskajās zonās"
      ],
      steps: [
        "Audu sagatavošana un sildīšana",
        "Dziļa manuāla masāža celulīta zonām",
        "Limfodrenāžas kustības",
        "Kopjošs termogēls vai krēms"
      ],
      suitableFor: ["Celulītam", "Atslābušai ādai", "Ķermeņa apjoma mazināšanai"]
    },
    en: {
      category: "Body Treatments",
      title: "Anti-Cellulite Body Massage (60 min)",
      summary: "A targeted manual sculpting massage focused on hips, thighs, and abdomen to break down fibrotic adhesions, mobilize lymphatic fluids, and tone the skin.",
      benefits: [
        "Visible smoothing of cellulite dimples",
        "Reduction of localized circumference in inches",
        "Heightened microvascular flow and collagen synthesis",
        "Firms loose post-diet or postpartum skin"
      ],
      steps: [
        "Warm-up hyperemic preparatory strokes",
        "Vigorous deep-tissue kneading and friction techniques",
        "Upward lymphatic drainage sweep",
        "Active thermal toning application"
      ],
      suitableFor: ["Cellulite and fluid stagnation", "Loss of thigh and glute firmness", "Body shaping"]
    }
  },

  "bmsg.10": {
    ru: {
      category: "Моделирование тела",
      title: "LIPOZERO 5D Body Contouring",
      summary: "Интеллектуальная аппаратная технология моделирования фигуры 5D: сочетает радиочастотный RF-лифтинг, вакуумный массаж, кавитацию и LED-терапию для разрушения жировых клеток и подтяжки кожи.",
      benefits: [
        "Уменьшение локальных жировых отложений в сантиметрах",
        "Разглаживание «апельсиновой корки» и лечение целлюлита",
        "Мощная подтяжка дряблой кожи тела",
        "Активация лимфотока и вывод застойной жидкости"
      ],
      steps: [
        "Осмотр и замер целевой зоны (живот, бедра, ягодицы, руки)",
        "Нанесение моделирующего контактного геля",
        "5D аппаратная обработка: ультразвуковая кавитация + мультиполярный RF + вакуум + лазер/LED",
        "Лимфодренажный завершающий массаж зоны"
      ],
      suitableFor: ["Локальные жировые ловушки", "Целлюлит 1-4 стадий", "Дряблость кожи после похудения или родов"]
    },
    lv: {
      category: "Ķermeņa modelēšana",
      title: "LIPOZERO 5D Body Contouring",
      summary: "LipoZero ir mūsdienīga 5D tehnoloģija ķermeņa aprisēm un ādas kvalitātes uzlabošanai, apvienojot kavitāciju, RF liftingu, vakuumu un LED gaismu vienlaicīgai tauku šūnu šķelšanai un liftingam.",
      benefits: [
        "Lokālo tauku uzkrājumu un apjoma mazināšana",
        "Celulīta vizuālo pazīmju izlīdzināšana",
        "Ādas tvirtuma un elastības atjaunošana",
        "Limfas atteces un mikrocirkulācijas uzlabošana"
      ],
      steps: [
        "Ķermeņa zonas novērtēšana",
        "Kontaktgēla uzklāšana",
        "LipoZero 5D tehnoloģiju apstrāde",
        "Noslēdzošais drenāžas posms"
      ],
      suitableFor: ["Lokāliem tauku uzkrājumiem", "Celulītam", "Atslābušai ādai pēc svara zaudēšanas"]
    },
    en: {
      category: "Body Modeling",
      title: "LIPOZERO 5D Body Contouring",
      summary: "Advanced 5-in-1 body sculpting technology uniting cavitation, multipolar radiofrequency, vacuum suction, and LED wavelengths to target stubborn fat and lax skin.",
      benefits: [
        "Measurable reduction in localized circumference",
        "Visible smoothing of stubborn cellulite dimples",
        "Tightening of loose dermal tissue",
        "Stimulation of lymphatic fluid elimination"
      ],
      steps: [
        "Zone assessment and measurement (abdomen, thighs, arms)",
        "Application of conductive lipolytic medium",
        "Simultaneous 5D mechanical and thermal delivery",
        "Targeted finishing drainage stroke"
      ],
      suitableFor: ["Stubborn localized fat pockets", "Cellulite stages 1-4", "Skin laxity post-weight loss or postpartum"]
    }
  },

  "bmsg.11": {
    ru: {
      category: "Моделирование тела",
      title: "LIPOZERO + Лимфодренажные сапоги (прессотерапия)",
      summary: "Идеальное сочетание для моделирования тела: аппаратный липолиз Lipozero разрушает жировые клетки, а сапоги прессотерапии моментально выводят продукты распада и лишнюю жидкость.",
      benefits: [
        "Двойной эффект: расщепление жира + ускоренное выведение",
        "Мгновенная легкость в ногах и снятие отеков",
        "Заметное уменьшение объемов уже после первого сеанса",
        "Улучшение венозного кровотока и тонуса сосудов"
      ],
      steps: [
        "Аппаратная процедура Lipozero 5D на выбранную зону",
        "Сеанс прессотерапии в лимфодренажных сапогах (30-40 мин)",
        "Нанесение увлажняющего моделирующего крема"
      ],
      suitableFor: ["Отечность ног и задержка жидкости", "Локальные жировые отложения", "Усталость и тяжесть в ногах"]
    },
    lv: {
      category: "Ķermeņa modelēšana",
      title: "LIPOZERO + Limfodrenāžas zābaki",
      summary: "LipoZero procedūra ķermeņa konturēšanai apvienota ar limfodrenāžas zābaku presoterapiju, nodrošinot ātru šķidruma aizplūšanu un viegluma sajūtu.",
      benefits: [
        "Pastiprināts apjomu samazināšanas efekts",
        "Tūlītējs vieglums kājās un pietūkuma mazināšana",
        "Tauku vielmaiņas produktu paātrināta izvadīšana",
        "Ādas tvirtuma un labsajūtas uzlabošana"
      ],
      steps: [
        "LipoZero procedūra izvēlētajai zonai",
        "Limfodrenāžas zābaku terapija",
        "Noslēdzošais kopjošais krēms"
      ],
      suitableFor: ["Kāju pietūkumam un smaguma sajūtai", "Tauku uzkrājumiem", "Celulīta mazināšanai"]
    },
    en: {
      category: "Body Modeling",
      title: "LIPOZERO + Vacuum Boots (Pressotherapy)",
      summary: "The ultimate contouring combo: Lipozero 5D lipolysis breaks down fat deposits, followed by pneumatic compression boots to rapidly flush fluids and metabolic waste.",
      benefits: [
        "Accelerated fat breakdown and metabolic clearance",
        "Immediate relief from leg heaviness and water retention",
        "Faster circumferential reduction across thighs and abdomen",
        "Boosted venous return and vascular resilience"
      ],
      steps: [
        "Lipozero 5D session on targeted area",
        "Pneumatic pressotherapy boots session (30-40 min)",
        "Finishing firming emulsion application"
      ],
      suitableFor: ["Leg edema and swelling", "Localized fat deposits", "Sluggish lymphatic circulation"]
    }
  },

  "bmsg.8": {
    ru: {
      category: "Массажи тела",
      title: "Антицеллюлитный массаж + Лимфодренажные сапоги (100 мин)",
      summary: "Интенсивная комплексная программа коррекции фигуры: глубокий ручной антицеллюлитный массаж всего тела дополняется сеансом аппаратной прессотерапии.",
      benefits: [
        "Мощная проработка подкожно-жировой клетчатки",
        "Разбивание фиброзных уплотнений и выравнивание рельефа",
        "Интенсивный дренаж и снятие тяжести в ногах",
        "Улучшение тургора кожи и уменьшение объемов"
      ],
      steps: [
        "Ручной антицеллюлитный массаж проблемных зон (бедра, ягодицы, живот, бока)",
        "Проработка скульптурирующими массажными техниками",
        "Сеанс в лимфодренажных сапогах",
        "Нанесение дренажного активного масла"
      ],
      suitableFor: ["Все стадии целлюлита", "Отечность и пастозность тела", "Снижение эластичности кожи"]
    },
    lv: {
      category: "Ķermeņa procedūras",
      title: "Anticelulīta masāža + Limfodrenāžas zābaki (100 min)",
      summary: "Kompleksa ķermeņa kopšanas procedūra, kas apvieno intensīvu visa ķermeņa anticelulīta masāžu ar limfodrenāžas zābaku terapiju.",
      benefits: [
        "Intensīva iedarbība uz celulīta zonām",
        "Limfas atteces un asinsrites stimulācija",
        "Smaguma sajūtas mazināšana kājās",
        "Ādas tvirtuma un gluduma atjaunošana"
      ],
      steps: [
        "Manuāla anticelulīta masāža problemātiskajām zonām",
        "Limfodrenāžas zābaku terapija",
        "Noslēdzošā ķermeņa kopšana"
      ],
      suitableFor: ["Celulītam", "Pietūkumam", "Ādas tvirtuma atjaunošanai"]
    },
    en: {
      category: "Body Treatments",
      title: "Anti-Cellulite Massage + Vacuum Boots (100 min)",
      summary: "A power-packed body contouring protocol pairing deep manual anti-cellulite massage with pneumatic compression boots for total drainage.",
      benefits: [
        "Breaks down stubborn subcutaneous fibrotic fat nodes",
        "Promotes intense lymphatic flushing",
        "Delivers immediate lightness in heavy legs",
        "Improves skin tone and smooths cellulite dimples"
      ],
      steps: [
        "Intensive manual sculpting on thighs, buttocks, and abdomen",
        "Pneumatic vacuum boot therapy cycle",
        "Firming draining oil seal"
      ],
      suitableFor: ["Cellulite and fluid retention", "Heavy legs", "Body contouring"]
    }
  },

  "bmsg.boot.30": {
    ru: {
      category: "Прессотерапия",
      title: "Прессотерапия (Лимфодренажные сапоги 30/40 мин)",
      summary: "Аппаратный пневматический лимфодренаж ног и области таза. Снимает усталость, уменьшает отечность, нормализует циркуляцию лимфы и предотвращает варикоз.",
      benefits: [
        "Быстрое снятие чувства тяжести и боли в ногах",
        "Выведение лишней интерстициальной жидкости",
        "Профилактика варикозного расширения вен",
        "Релаксация и восстановление после физических нагрузок"
      ],
      steps: [
        "Надевание одноразовых гигиенических штанов",
        "Помещение ног в многокамерные сапоги",
        "Индивидуальный подбор программы давления",
        "Сеанс релаксации (30 или 40 минут)"
      ],
      suitableFor: ["Отеки ног к концу дня", "Сидячая или стоячая работа", "Период восстановления после спорта", "Комплексные программы похудения"]
    },
    lv: {
      category: "Presoterapija",
      title: "Limfodrenāžas zābaki (presoterapija 30/40 min)",
      summary: "Aparāta pneimatiskā limfodrenāžas masāža kājām un gurnu zonai, kas novērš tūsku, mazina nogurumu un uzlabo asinsriti.",
      benefits: [
        "Ātra tūskas un smaguma sajūtas noņemšana",
        "Limfas atteces un asins cirkulācijas veicināšana",
        "Varikozu vēnu profilakse",
        "Patīkama relaksācija un atpūta"
      ],
      steps: [
        "Higiēnisko bikšu uzvilkšana",
        "Limfodrenāžas zābaku uzlikšana",
        "Spiediena režīma izvēle",
        "Relaksācijas seanss"
      ],
      suitableFor: ["Kāju pietūkumam", "Nogurušām kājām", "Sēdoša vai stāvoša darba veicējiem"]
    },
    en: {
      category: "Pressotherapy",
      title: "Pressotherapy Vacuum Boots (30/40 min)",
      summary: "Pneumatic dynamic compression therapy for legs and hips. Clears lymphatic stagnation, eases soreness, deflates swelling, and enhances circulation.",
      benefits: [
        "Rapid dissipation of leg heaviness and fatigue",
        "Flushes excess interstitial fluid",
        "Helps prevent varicose vein development",
        "Restorative recovery after standing or workouts"
      ],
      steps: [
        "Application of sterile protective suit",
        "Placement inside multi-chamber compression sleeves",
        "Pressure graduation setting",
        "Relaxing 30/40 minute cycle"
      ],
      suitableFor: ["Swollen feet and ankles", "Standing or sedentary jobs", "Athletic recovery", "Cellulite programs"]
    }
  },

  // =================== WAXING & BROWS ===================
  "wax.1": {
    ru: {
      category: "Депиляция воском",
      title: "Глубокое бикини (пленочный воск)",
      summary: "Деликатная и тщательная депиляция зоны глубокого бикини с использованием премиального пленочного воска Italwax, минимальными болевыми ощущениями и гладкостью до 4 недель.",
      benefits: [
        "Безупречная гладкость до 3-4 недель",
        "Бережное отношение к деликатной коже",
        "Постепенное истончение и замедление роста волос",
        "Профилактика раздражений и вросших волос"
      ],
      steps: [
        "Очищение и антисептическая обработка зоны",
        "Нанесение защитного талька",
        "Нанесение теплого пленочного воска и быстрое удаление",
        "Успокаивающее масло/эмульсия после депиляции"
      ],
      suitableFor: ["Длительная идеальная гладкость", "Подготовка к отпуску", "Чувствительная кожа"]
    },
    lv: {
      category: "Vaksācija",
      title: "Bikini dziļais (plēves vasks)",
      summary: "Dziļās bikini zonas depilācija ar augstākās kvalitātes plēves vasku. Saudzīga pieeja un ilgstošs gludums.",
      benefits: [
        "Ilgstošs gludums 3-4 nedēļas",
        "Minimāls diskomforts pateicoties plēves vaska elastībai",
        "Matiņi ataug mīkstāki un plānāki",
        "Nomierinoša kopšana pēc procedūras"
      ],
      steps: [
        "Ādas sagatavošana un dezinfekcija",
        "Plēves vaska uzklāšana un noņemšana",
        "Nomierinoša kopšana pret kairinājumu"
      ],
      suitableFor: ["Ilgstošam gludumam", "Jutīgai ādai"]
    },
    en: {
      category: "Waxing",
      title: "Deep Bikini (Film Wax)",
      summary: "Gentle and thorough deep bikini hair removal using low-temperature Italian film wax for minimal discomfort and silky smoothness lasting up to 4 weeks.",
      benefits: [
        "Impeccable smoothness for 3-4 weeks",
        "Gentle on sensitive intimate skin",
        "Gradual thinning and softening of regrowth",
        "Includes post-wax soothing and ingrown prevention care"
      ],
      steps: [
        "Sanitization and prep talc application",
        "Precision application and removal of low-temp film wax",
        "Post-depilatory calming and soothing oil"
      ],
      suitableFor: ["Long-lasting hairlessness", "Pre-vacation grooming", "Sensitive skin"]
    }
  },

  "brow.1": {
    ru: {
      category: "Брови и ресницы",
      title: "Коррекция + покраска бровей",
      summary: "Моделирование идеальной формы бровей воском и пинцетом с окрашиванием стойкими австрийскими красителями RefectoCil с учетом цветотипа лица.",
      benefits: [
        "Идеальная форма бровей, подчеркивающая черты лица",
        "Стойкий насыщенный цвет до 4-5 недель",
        "Четкий, аккуратный и выразительный взгляд",
        "Экономия времени на ежедневный макияж"
      ],
      steps: [
        "Очищение и моделирование формы бровей",
        "Коррекция формы воском и пинцетом",
        "Колористика и окрашивание краской RefectoCil",
        "Успокаивающий гель для бровей"
      ],
      suitableFor: ["Для всех типов внешности", "Непослушные, светлые или асимметричные брови"]
    },
    lv: {
      category: "Uzacis un skropstas",
      title: "Uzacu korekcija + krāsošana",
      summary: "Uzacu formas modelēšana un korekcija ar vasku un pinceti, krāsojot ar profesionālu RefectoCil krāsu.",
      benefits: [
        "Skaista, koptas uzacu formas izveide",
        "Noturīga krāsa līdz pat 4 nedēļām",
        "Izteiksmīgs un dabisks skatiens",
        "Piemērots tonis atbilstoši matu un ādas krāsai"
      ],
      steps: [
        "Formas saskaņošana",
        "Korekcija ar vasku un pinceti",
        "Krāsošana ar RefectoCil",
        "Kopjošs fiksējošs gēls"
      ],
      suitableFor: ["Visiem klientiem", "Dabiska akcenta piešķiršanai skatienam"]
    },
    en: {
      category: "Brows & Lashes",
      title: "Eyebrow Shaping + Tinting",
      summary: "Bespoke brow architecture using warm wax and precision tweezers, paired with custom RefectoCil tinting tailored to your facial aesthetics.",
      benefits: [
        "Flawless brow symmetry complementing facial features",
        "Long-lasting rich pigment lasting 3-4 weeks",
        "Enhanced eye definition with a natural finish",
        "Time-saving effortless daily beauty"
      ],
      steps: [
        "Brow mapping and shape consultation",
        "Precision wax and tweezing clean-up",
        "Customized RefectoCil pigment application",
        "Calming botanical soothing brow gel"
      ],
      suitableFor: ["All brow types", "Light or sparse brows", "Framing facial contours"]
    }
  }
};

const fullOutput = `// Auto-generated procedure descriptions database for SOVA SKINCARE
// Contains full descriptions in RU, LV, EN
const procedureDescriptions = ${JSON.stringify(descriptions, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'procedure-descriptions.js'), fullOutput, 'utf8');
console.log("Written " + Object.keys(descriptions).length + " procedures to procedure-descriptions.js");
