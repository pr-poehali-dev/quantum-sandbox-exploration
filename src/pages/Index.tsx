import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

interface StrategyCardProps {
  id: string
  icon: string
  title: string
  valueProp: string
  what: string[]
  metrics: string[]
  sources: string[]
  tag: "Речь" | "Звуки" | "Чтение" | "Развитие" | "Коммуникация" | "Нейро" | "Сопровождение"
}

const tagLabels: Record<StrategyCardProps["tag"], string> = {
  Речь: "Речь",
  Звуки: "Звуки",
  Чтение: "Чтение",
  Развитие: "Развитие",
  Коммуникация: "Коммуникация",
  Нейро: "Нейро",
  Сопровождение: "Сопровождение",
}

function StrategyCard({ icon, title, valueProp, what, metrics, sources, tag }: StrategyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const tagColors = {
    Речь: "bg-red-100 text-red-800",
    Звуки: "bg-orange-100 text-orange-800",
    Чтение: "bg-blue-100 text-blue-800",
    Развитие: "bg-green-100 text-green-800",
    Коммуникация: "bg-purple-100 text-purple-800",
    Нейро: "bg-pink-100 text-pink-800",
    Сопровождение: "bg-gray-100 text-gray-800",
  }

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg rounded-2xl border-2"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Icon name={icon} size={24} className="text-primary" fallback="Star" />
            </div>
            <CardTitle className="text-xl leading-tight text-balance">{title}</CardTitle>
          </div>
          <Badge className={`${tagColors[tag]} text-xs font-semibold flex-shrink-0 ml-2`}>{tagLabels[tag]}</Badge>
        </div>
        <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
          <p className="text-base text-foreground leading-relaxed">{valueProp}</p>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-6 pt-0">
          <div>
            <h5 className="font-semibold text-foreground mb-3 text-base">Что включено</h5>
            <ul className="space-y-2 text-base text-muted-foreground">
              {what.map((item, index) => (
                <li key={index} className="leading-relaxed flex items-start">
                  <span className="mr-2 flex-shrink-0">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-3 text-base">Показатели успеха</h5>
            <ul className="space-y-2 text-base text-muted-foreground">
              {metrics.map((metric, index) => (
                <li key={index} className="leading-relaxed flex items-start">
                  <span className="mr-2 flex-shrink-0">-</span>
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 border-t">
            <h5 className="font-semibold text-foreground mb-2 text-sm">Методы и подходы</h5>
            <p className="text-sm text-muted-foreground italic">{sources.join("; ")}</p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

interface RecommendationCardProps {
  number: number
  title: string
  icon: React.ReactNode
  what: string
  why: string
  firstSteps: string[]
}

function RecommendationCard({ number, title, icon, what, why, firstSteps }: RecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="cursor-pointer transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3 min-h-[60px] flex justify-center" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="flex items-center justify-between text-base sm:text-lg leading-tight">
          <div className="flex items-center space-x-2 pr-2">
            <div className="flex-shrink-0">{icon}</div>
            <span className="text-balance">
              {number}. {title}
            </span>
          </div>
          <div className="flex-shrink-0 ml-2">
            {isExpanded ? (
              <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
            ) : (
              <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-6 pt-0 px-4 sm:px-6">
          <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
            <p className="text-sm text-foreground font-medium leading-relaxed">{why}</p>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-3 text-base">Что включено</h5>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{what}</p>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-3 text-base">Первые шаги</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {firstSteps.map((step, index) => (
                <li key={index} className="leading-relaxed flex items-start">
                  <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function TableOfContents() {
  const [activeSection, setActiveSection] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const sections = [
    { id: "specialist", label: "Специалист" },
    { id: "executive-summary", label: "Резюме" },
    { id: "service-options", label: "Форматы занятий" },
    { id: "recommendations", label: "Направления работы" },
    { id: "fees", label: "Стоимость" },
    { id: "onboarding", label: "Как начать" },
    { id: "next-steps", label: "Следующие шаги" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsOpen(false)
    }
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background/95 backdrop-blur-sm shadow-lg"
        >
          <Icon name="Menu" size={16} />
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <Card className="absolute top-16 right-4 w-48 bg-background shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Содержание</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      <nav className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 z-50">
        <Card className="w-44 bg-background/95 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wide">Содержание</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 pb-4 px-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left text-xs px-2 py-1.5 rounded transition-colors ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {section.label}
              </button>
            ))}
          </CardContent>
        </Card>
      </nav>
    </>
  )
}

interface ServiceCategory {
  id: string
  title: string
  color: string
  icon: React.ReactNode
  services: ServiceItem[]
}

interface ServiceItem {
  service: string
  details: string
  isPersonalized?: boolean
}

const speechTherapyServices: ServiceCategory[] = [
  {
    id: "sound-production",
    title: "Постановка и автоматизация звуков",
    color: "bg-orange-100 text-orange-800",
    icon: <Icon name="Mic" size={24} fallback="Volume2" />,
    services: [
      {
        service: "Диагностика звукопроизношения",
        details: "Полное обследование всех групп звуков, выявление нарушений и составление плана коррекции",
      },
      {
        service: "Постановка звуков",
        details: "Поэтапная работа по формированию правильного артикуляционного уклада каждого звука",
      },
      {
        service: "Автоматизация в слогах и словах",
        details: "Закрепление правильного произношения в изолированных позициях и речевом материале",
        isPersonalized: true,
      },
      {
        service: "Дифференциация смешиваемых звуков",
        details: "Работа по различению и правильному использованию схожих по звучанию или артикуляции звуков",
        isPersonalized: true,
      },
      {
        service: "Автоматизация в самостоятельной речи",
        details: "Перенос правильного произношения в свободную речь: пересказы, диалоги, стихи",
        isPersonalized: true,
      },
    ],
  },
  {
    id: "language-development",
    title: "Развитие речи и словарного запаса",
    color: "bg-blue-100 text-blue-800",
    icon: <Icon name="BookOpen" size={24} fallback="Book" />,
    services: [
      {
        service: "Расширение активного словаря",
        details: "Целенаправленная работа по введению новых слов в активную речь ребёнка",
        isPersonalized: true,
      },
      {
        service: "Формирование грамматического строя",
        details: "Работа над падежами, согласованием слов, предлогами и построением предложений",
        isPersonalized: true,
      },
      {
        service: "Развитие связной речи",
        details: "Обучение пересказу, составлению рассказов по картинке и самостоятельным высказываниям",
        isPersonalized: true,
      },
      {
        service: "Обогащение пассивного словаря",
        details: "Расширение понимания речи, знакомство с новыми понятиями и лексическими темами",
      },
    ],
  },
  {
    id: "reading-writing",
    title: "Подготовка к чтению и письму",
    color: "bg-green-100 text-green-800",
    icon: <Icon name="PenLine" size={24} fallback="Edit" />,
    services: [
      {
        service: "Фонематический слух и анализ",
        details: "Развитие умения слышать и различать звуки, проводить звукослоговой анализ слов",
        isPersonalized: true,
      },
      {
        service: "Обучение грамоте",
        details: "Знакомство с буквами, слоговое и послоговое чтение, первичные навыки письма",
        isPersonalized: true,
      },
      {
        service: "Профилактика дисграфии и дислексии",
        details: "Ранняя работа по предупреждению нарушений письма и чтения ещё до школы",
        isPersonalized: true,
      },
    ],
  },
  {
    id: "fine-motor",
    title: "Мелкая моторика и артикуляционная гимнастика",
    color: "bg-purple-100 text-purple-800",
    icon: <Icon name="Hand" size={24} fallback="Star" />,
    services: [
      {
        service: "Артикуляционная гимнастика",
        details: "Комплекс упражнений для развития подвижности органов артикуляции",
        isPersonalized: true,
      },
      {
        service: "Развитие мелкой моторики",
        details: "Пальчиковые игры, работа с различными материалами, координация движений рук",
      },
      {
        service: "Массаж артикуляционного аппарата",
        details: "При необходимости — логопедический массаж для нормализации тонуса мышц",
      },
    ],
  },
  {
    id: "communication",
    title: "Коммуникация и социальная речь",
    color: "bg-pink-100 text-pink-800",
    icon: <Icon name="MessageCircle" size={24} fallback="MessageSquare" />,
    services: [
      {
        service: "Развитие диалогической речи",
        details: "Обучение умению поддерживать беседу, задавать вопросы и отвечать на них",
        isPersonalized: true,
      },
      {
        service: "Работа с заиканием",
        details: "Комплексный подход к коррекции темпо-ритмических нарушений речи",
      },
      {
        service: "Подготовка к публичным выступлениям",
        details: "Работа с уверенностью в речи, выразительностью и навыками презентации",
      },
    ],
  },
  {
    id: "special-needs",
    title: "Работа с особыми потребностями",
    color: "bg-yellow-100 text-yellow-800",
    icon: <Icon name="Heart" size={24} fallback="Star" />,
    services: [
      {
        service: "Логопедическая помощь при ОНР",
        details: "Комплексная коррекция общего недоразвития речи всех уровней",
        isPersonalized: true,
      },
      {
        service: "Работа при задержке речевого развития",
        details: "Запуск речи у неговорящих детей, стимуляция речевой активности",
      },
      {
        service: "Сопровождение при РАС и ЗПРР",
        details: "Адаптированные программы для детей с расстройствами аутистического спектра и задержкой",
      },
    ],
  },
  {
    id: "parent-support",
    title: "Поддержка родителей",
    color: "bg-teal-100 text-teal-800",
    icon: <Icon name="Users" size={24} fallback="User" />,
    services: [
      {
        service: "Консультации для родителей",
        details: "Разбор домашних заданий, обучение приёмам работы с ребёнком в домашних условиях",
        isPersonalized: true,
      },
      {
        service: "Дневник наблюдений и обратная связь",
        details: "Регулярные отчёты о прогрессе ребёнка, рекомендации по занятиям дома",
        isPersonalized: true,
      },
      {
        service: "Взаимодействие с педагогами и психологами",
        details: "Координация работы с другими специалистами для комплексного сопровождения ребёнка",
      },
    ],
  },
]

function ExecutiveSummaryCard() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card
      className="mb-8 sm:mb-12 cursor-pointer transition-all duration-200 hover:shadow-lg rounded-2xl border-2"
      id="executive-summary"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={20} className="text-primary flex-shrink-0" />
            <CardTitle className="text-xl sm:text-2xl">Резюме предложения</CardTitle>
          </div>
          {isExpanded ? (
            <Icon name="ChevronDown" size={20} className="text-muted-foreground flex-shrink-0" />
          ) : (
            <Icon name="ChevronRight" size={20} className="text-muted-foreground flex-shrink-0" />
          )}
        </div>
        <CardDescription className="text-base leading-relaxed">
          Ситуация вашего ребёнка и ключевые направления работы
        </CardDescription>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-8">
          <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
            <p className="text-base text-foreground leading-relaxed">
              Ваш ребёнок обратился к специалисту с запросом на коррекцию речевых нарушений. Своевременная помощь
              логопеда — это инвестиция в успешное обучение в школе, уверенную коммуникацию и гармоничное развитие
              личности. Мы готовы составить индивидуальную программу и сопровождать вас на каждом этапе.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground text-lg">Что мы видим сейчас</h4>
              <ul className="space-y-4 text-base text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Нарушения звукопроизношения: пропуски, замены или искажения отдельных звуков
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Недостаточный уровень развития связной речи и словарного запаса для возраста
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Трудности с фонематическим слухом — основой успешного обучения чтению и письму
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Необходимость в регулярных занятиях и поддержке со стороны родителей
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground text-lg">На чём сфокусируемся вместе</h4>
              <ul className="space-y-4 text-base text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Составим индивидуальный план коррекции с учётом возраста и особенностей ребёнка
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Поставим и автоматизируем звуки в игровой форме — без стресса для ребёнка
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Обучим родителей как правильно заниматься дома и закреплять результат
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Подготовим ребёнка к школе: чтение, письмо, уверенное общение со сверстниками
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function ServiceCategoryCard({ category }: { category: ServiceCategory }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const personalizedCount = category.services.filter((s) => s.isPersonalized).length

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg rounded-2xl border-2"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">{category.icon}</div>
            <CardTitle className="text-xl leading-tight text-balance">{category.title}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {personalizedCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                {personalizedCount} для вас
              </Badge>
            )}
            <Badge className={`${category.color} text-xs`}>{category.services.length} услуг</Badge>
            {isExpanded ? (
              <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
            ) : (
              <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-4">
            {category.services.map((service, index) => (
              <div
                key={index}
                className={`border-l-4 pl-4 py-2 ${
                  service.isPersonalized ? "border-primary bg-primary/5" : "border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-semibold text-foreground text-base mb-1 flex-1">{service.service}</h5>
                  {service.isPersonalized && (
                    <Badge className="bg-primary text-primary-foreground text-xs font-semibold flex-shrink-0">
                      Для вас
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default function ClientProposal() {
  return (
    <div className="min-h-screen bg-background">
      <TableOfContents />

      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Icon name="MessageCircle" size={22} className="text-primary-foreground" fallback="Star" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                  Учитель-логопед
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Индивидуальный подход. Игровые методы. Реальный результат.</p>
              </div>
            </div>
            <div className="text-left sm:text-right space-y-1 w-full sm:w-auto">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                <Icon name="MapPin" size={16} className="flex-shrink-0" />
                <span>Укажите ваш адрес или формат (онлайн / офлайн)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                <Icon name="Phone" size={16} className="flex-shrink-0" />
                <span>+7 (000) 000-00-00</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                <Icon name="Mail" size={16} className="flex-shrink-0" />
                <span>logoped@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mt-20">
        {/* Hero */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="secondary" className="mb-4">
            Коммерческое предложение
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance leading-tight">
            Индивидуальная программа логопедических занятий
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
            Комплексная работа со звукопроизношением, развитием речи и подготовкой к школе — в игровой форме, с результатом
          </p>
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>Дата: {new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
          </div>
        </div>

        {/* About Specialist */}
        <Card className="mb-8 sm:mb-12" id="specialist">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl sm:text-2xl">
              <Icon name="GraduationCap" size={20} className="text-primary" />
              <span>О специалисте</span>
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Квалификация и опыт работы с детьми
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name="GraduationCap" size={24} className="text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-base">Образование</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Высшее дефектологическое образование, специализация «Логопедия»</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name="Star" size={24} className="text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-base">Опыт</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Более 5 лет работы с детьми от 2 до 12 лет, более 200 выпускников</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name="Award" size={24} className="text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-base">Методы</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Авторские игровые методики, нейрологопедия, сенсорная интеграция</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Executive Summary */}
        <ExecutiveSummaryCard />

        {/* Service Options */}
        <Card className="mb-8 sm:mb-12" id="service-options">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Выберите подходящий формат</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Три варианта занятий под разные задачи и возможности
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 1 */}
              <div className="border rounded-lg p-6 space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-lg">Разовые консультации</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Диагностика и конкретная помощь по запросу
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Для кого подходит</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Хотите получить заключение специалиста
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Нужна консультация перед школой
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Хотите узнать, есть ли проблема
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Что вы получите</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Диагностика речевого развития
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Письменное заключение
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Рекомендации для родителей
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card 2: Highlighted */}
              <div className="border-2 border-primary rounded-lg p-6 space-y-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1">
                    Популярный выбор
                  </Badge>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-lg">Курс занятий</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Системная работа для устойчивого результата
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Для кого подходит</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Дети с нарушениями звукопроизношения
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Задержка речевого развития
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Подготовка к школе
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Что вы получите</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        2-3 занятия в неделю
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Индивидуальная программа коррекции
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Домашние задания и дневник прогресса
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Ежемесячная консультация родителей
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="border rounded-lg p-6 space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-lg">Комплексное сопровождение</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Полноценная поддержка на длительный период</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Для кого подходит</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Сложные речевые нарушения (ОНР, алалия)
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Дети с ОВЗ, РАС, ЗПРР
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Что вы получите</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        До 5 занятий в неделю
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Взаимодействие с психологом и педагогом
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Еженедельная обратная связь родителям
                      </li>
                      <li className="flex items-start">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Адаптация программы каждый месяц
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <div className="mb-8 sm:mb-12" id="recommendations">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            Направления логопедической работы
          </h2>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            Комплексный подход охватывает все аспекты речевого развития ребёнка. Нажмите на любое направление, чтобы узнать подробнее.
          </p>

          <div className="space-y-6">
            {speechTherapyServices.map((category) => (
              <ServiceCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Fees */}
        <Card className="mb-8 sm:mb-12" id="fees">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Стоимость занятий</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Прозрачные тарифы без скрытых платежей
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-lg">Тарифы</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Первичная диагностика (60 мин)</span>
                    <span className="text-sm font-semibold">2 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Индивидуальное занятие (45 мин)</span>
                    <span className="text-sm font-semibold">1 500 ₽</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Абонемент 8 занятий</span>
                    <span className="text-sm font-semibold">10 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Консультация родителей (30 мин)</span>
                    <span className="text-sm font-semibold">700 ₽</span>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Экономия с абонементом:</span> 2 000 ₽ при покупке 8 занятий сразу
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    <span className="font-semibold text-foreground">Онлайн-занятия:</span> та же стоимость, удобный формат
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-lg">Как оплатить</h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Оплата производится перед началом занятия или курса. Принимаем наличные, перевод на карту или онлайн-оплату. Абонемент действует 2 месяца.
                </p>
                <a
                  href="#next-steps"
                  onClick={(e) => { e.preventDefault(); document.getElementById("next-steps")?.scrollIntoView({ behavior: "smooth" }) }}
                  className="inline-flex items-center justify-center w-full min-h-[48px] text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
                >
                  Записаться на занятие
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Onboarding */}
        <Card className="mb-8 sm:mb-12" id="onboarding">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Как начать занятия</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Простой и понятный процесс от первого звонка до первого занятия
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-10">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Icon name="Phone" size={32} className="text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Шаг 1</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Первичный контакт</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Позвоните или напишите — расскажите о ситуации, и мы договоримся об удобном времени для диагностики.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Звонок или WhatsApp/Telegram</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Бесплатная консультация 10 минут</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Icon name="ClipboardList" size={32} className="text-primary" fallback="FileText" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Шаг 2</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Диагностика речи</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      На первом занятии проводим полное обследование: определяем уровень развития речи, выявляем нарушения и сильные стороны ребёнка.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Обследование звукопроизношения</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Оценка словаря и грамматики</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Icon name="Target" size={32} className="text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Шаг 3</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Индивидуальная программа</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Составляем план коррекции под конкретного ребёнка: определяем цели, сроки и частоту занятий.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Письменный план коррекции</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Рекомендации родителям</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Icon name="TrendingUp" size={32} className="text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Шаг 4</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Занятия и прогресс</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Регулярные занятия в игровой форме, домашние задания и ежемесячная обратная связь — вы всегда в курсе успехов ребёнка.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Дневник наблюдений</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Адаптация программы при необходимости</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Callout */}
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-2xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <Icon name="CheckCircle" size={24} className="text-primary-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-lg">Что вы получите в итоге</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Ребёнок говорит правильно и уверенно, готов к школе — а вы знаете, как поддерживать результат дома.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 sm:mb-12" id="next-steps">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Следующие шаги</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Готовы начать? Вот как записаться на первое занятие.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-lg">Как записаться</h4>
                <ol className="space-y-4 text-base text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mt-0.5 font-semibold">
                      1
                    </span>
                    <span className="leading-relaxed">
                      Позвоните или напишите в мессенджер — обсудим ситуацию и выберем время
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mt-0.5 font-semibold">
                      2
                    </span>
                    <span className="leading-relaxed">Приходите на первичную диагностику — это 60 минут</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mt-0.5 font-semibold">
                      3
                    </span>
                    <span className="leading-relaxed">
                      Получите индивидуальный план и начните занятия уже на следующей неделе
                    </span>
                  </li>
                </ol>
              </div>
              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-lg">Важное</h4>
                <div className="space-y-4 text-base text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <Icon name="Phone" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <div className="leading-relaxed">
                      <span className="font-semibold text-foreground">Телефон:</span> +7 (000) 000-00-00 — звонки и WhatsApp/Telegram
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="FileText" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <div className="leading-relaxed">
                      <span className="font-semibold text-foreground">Договор:</span> Перед началом занятий подписываем договор об оказании услуг
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Clock" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <div className="leading-relaxed">
                      <span className="font-semibold text-foreground">Расписание:</span> Занятия в будни и выходные, утром и вечером
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <div className="text-center space-y-3">
                <p className="text-base text-muted-foreground leading-relaxed">
                  Это предложение подготовлено индивидуально. Чем раньше начнём — тем лучше будет результат.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Учитель-логопед — logoped@example.com — +7 (000) 000-00-00
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Дополнительно</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Полезные материалы и информация для родителей
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Полезные материалы</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Памятки, упражнения и рекомендации для домашних занятий — всё, чтобы закреплять результат между встречами.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Родительский чат</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Закрытое сообщество родителей моих учеников — обмен опытом, поддержка и полезные советы.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>- Видео-инструкции по артикуляционной гимнастике</li>
                    <li>- Ответы на частые вопросы</li>
                    <li>- Анонсы открытых занятий</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Новости и статьи</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Регулярно пишу о развитии детской речи, методах работы и лайфхаках для родителей.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Подпишитесь, чтобы быть в курсе актуальных тем.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Нормы развития речи</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Таблица норм речевого развития по возрасту поможет вам понять, соответствует ли ваш ребёнок возрастным показателям.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    Помните: каждый ребёнок развивается в своём темпе.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Есть вопросы?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Готова ответить на любые вопросы о развитии речи вашего ребёнка и о том, чем могу помочь.
                  </p>
                  <a
                    href="mailto:logoped@example.com"
                    className="inline-flex items-center justify-center w-full min-h-[40px] text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
                  >
                    Написать письмо
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Отзывы родителей</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Читайте истории семей, чьи дети уже прошли курс занятий и говорят правильно и уверенно.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-full min-h-[40px] text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
                  >
                    Читать отзывы
                  </a>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
