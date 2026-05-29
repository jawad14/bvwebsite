'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  id: number
  from: 'bot' | 'user'
  text: string
  quick?: string[]
}

const INITIAL: Message = {
  id: 0,
  from: 'bot',
  text: "Hi! 👋 I'm the BV Parts Assistant. I can help you find parts, get a quote, or connect you with our team. What can I help you with today?",
  quick: ['🔍 Find a Part', '💬 Get a Quote', '🚚 Delivery Info', '📞 Talk to a Rep'],
}

type Step =
  | 'idle'
  | 'find_part_ask'
  | 'find_part_vehicle'
  | 'find_part_result'
  | 'quote_ask'
  | 'quote_done'
  | 'delivery'
  | 'rep'
  | 'done'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL])
  const [input, setInput] = useState('')
  const [step, setStep] = useState<Step>('idle')
  const [typing, setTyping] = useState(false)
  const [partName, setPartName] = useState('')
  const [unread, setUnread] = useState(1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  function addBot(text: string, quick?: string[], delayMs = 900) {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { id: nextId.current++, from: 'bot', text, quick }])
    }, delayMs)
  }

  function addUser(text: string) {
    setMessages(prev => [...prev, { id: nextId.current++, from: 'user', text }])
  }

  function handleQuick(label: string) {
    addUser(label)
    setInput('')
    route(label)
  }

  function handleSend() {
    const text = input.trim()
    if (!text) return
    addUser(text)
    setInput('')
    route(text)
  }

  function route(text: string) {
    const t = text.toLowerCase()

    if (step === 'idle') {
      if (t.includes('find') || t.includes('part') || t.includes('search')) {
        setStep('find_part_ask')
        addBot("Sure! What part are you looking for? (e.g. front bumper, headlight, mirror, grille...)")
      } else if (t.includes('quote')) {
        setStep('quote_ask')
        addBot("I'll get you a quote! Please describe the parts you need and include your vehicle's year, make, and model.")
      } else if (t.includes('delivery') || t.includes('shipping') || t.includes('zone')) {
        setStep('delivery')
        addBot(
          "🚚 We run same-day delivery across the Chicago metro area!\n\n• Zone 1 (Melrose Park area): 1–2 hrs\n• Zone 2 (Chicago & suburbs): 2–3 hrs\n• Zone 3 (Extended metro): 3–5 hrs\n• Regional (IL, IN, WI, IA, MI): Next day\n\nOrder cutoffs vary by zone. Want more details?",
          ['📦 More Delivery Info', '📞 Talk to a Rep', '🔍 Find a Part'],
        )
      } else if (t.includes('rep') || t.includes('call') || t.includes('talk') || t.includes('human') || t.includes('person')) {
        setStep('rep')
        addBot(
          "I'll connect you with our team! 📞\n\nOur parts specialists are available:\n**Mon–Fri 8 AM – 7 PM CST**\n\nCall us directly at **(773) 762-1000** or click below to request a callback.",
          ['📞 Call Now', '✉️ Request a Quote', '🔍 Find a Part'],
        )
      } else {
        addBot("I can help with finding parts, getting a quote, delivery info, or connecting you with a rep. What would you like?",
          ['🔍 Find a Part', '💬 Get a Quote', '🚚 Delivery Info', '📞 Talk to a Rep'])
      }
    } else if (step === 'find_part_ask') {
      setPartName(text)
      setStep('find_part_vehicle')
      addBot(`Got it - **${text}**! What's the year, make, and model of your vehicle? (e.g. 2019 Toyota Camry)`)
    } else if (step === 'find_part_vehicle') {
      setStep('find_part_result')
      addBot(`Checking availability for a **${partName}** on a **${text}**...`, undefined, 600)
      setTimeout(() => {
        addBot(
          `✅ Great news! We very likely carry that part in stock. Our inventory covers 500+ makes and models with aftermarket/OEM comparable quality parts at honest prices.\n\nTo confirm fitment and get your best price, call or request a quote now:`,
          ['📞 Call (773) 762-1000', '💬 Request a Quote', '🔍 Find Another Part'],
          1800,
        )
        setStep('done')
      }, 1800)
    } else if (step === 'quote_ask') {
      setStep('quote_done')
      addBot(
        "Thanks! I've noted your request. Our team will prepare a quote for you.\n\nFor the fastest response, call us directly at **(773) 762-1000** or use the quote form on our website.",
        ['📞 Call Now', '✉️ Go to Quote Form', '🔍 Find Another Part'],
        1000,
      )
    } else if (step === 'delivery') {
      if (t.includes('more') || t.includes('detail') || t.includes('info')) {
        addBot("For full delivery zone maps and policies, visit our Delivery page. Same-day cutoffs: Zone 1 by 4 PM, Zone 2 by 2 PM, Zone 3 by 12 PM noon.",
          ['🌐 View Delivery Page', '📞 Talk to a Rep', '🔍 Find a Part'])
      } else {
        routeFallback(t)
      }
    } else if (step === 'rep' || step === 'done') {
      if (t.includes('call') || t.includes('773') || t.includes('phone')) {
        addBot("Great! Just dial **(773) 762-1000** - our team picks up fast. Mon–Fri 8 AM–7 PM CST. 🙂",
          ['🔍 Find Another Part', '💬 Get a Quote'])
      } else if (t.includes('quote') || t.includes('form')) {
        addBot("Head to our quote form and we'll get back to you quickly!", ['🌐 Open Quote Form', '🔍 Find a Part'])
      } else if (t.includes('find') || t.includes('another') || t.includes('part')) {
        setStep('find_part_ask')
        addBot("What part are you looking for this time?")
      } else {
        routeFallback(t)
      }
    } else {
      routeFallback(t)
    }
  }

  function routeFallback(t: string) {
    if (t.includes('thank')) {
      addBot("You're welcome! Is there anything else I can help you with?", ['🔍 Find a Part', '📞 Talk to a Rep'])
      setStep('idle')
    } else {
      addBot("I'm best at helping with parts lookup, quotes, and delivery info. What would you like to do?",
        ['🔍 Find a Part', '💬 Get a Quote', '📞 Talk to a Rep'])
      setStep('idle')
    }
  }

  function handleQuickAction(label: string) {
    if (label === '📞 Call Now' || label === '📞 Call (773) 762-1000') {
      window.location.href = 'tel:17737621000'
      return
    }
    if (label === '✉️ Request a Quote' || label === '✉️ Go to Quote Form' || label === '🌐 Open Quote Form') {
      window.dispatchEvent(new CustomEvent('bv:quote'))
      return
    }
    if (label === '🌐 View Delivery Page') {
      window.location.href = '/delivery'
      return
    }
    if (label === '🔍 Find Another Part') {
      addUser(label)
      setStep('find_part_ask')
      addBot("What part are you looking for?")
      return
    }
    handleQuick(label)
  }

  return (
    <>
      {/* Floating button */}
      <button
        className={`chat-fab ${open ? 'chat-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open parts assistant'}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z"/></svg>
            {unread > 0 && <span className="chat-fab__badge">{unread}</span>}
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chatbox">
          {/* Header */}
          <div className="chatbox__head">
            <div className="chatbox__avatar">BV</div>
            <div>
              <div className="chatbox__name">BV Parts Assistant</div>
              <div className="chatbox__status"><span className="chatbox__dot" />Online now</div>
            </div>
            <button className="chatbox__close" onClick={() => setOpen(false)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbox__body">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg chat-msg--${msg.from}`}>
                {msg.from === 'bot' && <div className="chat-msg__avatar">BV</div>}
                <div className="chat-msg__bubble">
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    }} />
                  ))}
                  {msg.quick && (
                    <div className="chat-quick">
                      {msg.quick.map(q => (
                        <button key={q} className="chat-quick__btn" onClick={() => handleQuickAction(q)}>{q}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="chat-msg chat-msg--bot">
                <div className="chat-msg__avatar">BV</div>
                <div className="chat-msg__bubble chat-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chatbox__foot">
            <input
              ref={inputRef}
              className="chatbox__input"
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button className="chatbox__send" onClick={handleSend} aria-label="Send" disabled={!input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
          <div className="chatbox__powered">Powered by Best Value Auto Body Supply</div>
        </div>
      )}
    </>
  )
}
