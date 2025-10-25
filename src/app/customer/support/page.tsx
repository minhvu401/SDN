'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  Circle,
  Send,
  Paperclip,
  Image as ImageIcon,
  Phone,
  Clock,
  ShieldCheck,
  Bot,
  User as UserIcon,
  FileText,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type ChatMsg = {
  id: string;
  role: 'agent' | 'customer' | 'system';
  text?: string;
  time: string;
  fileName?: string;
  fileType?: string;
  fileUrl?: string; // preview (local)
};

export default function CustomerSupportPage() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'sys-1',
      role: 'system',
      text: 'Bạn đang trò chuyện với EV Care. Vui lòng mô tả nhu cầu của bạn.',
      time: '09:00',
    },
    {
      id: 'ag-1',
      role: 'agent',
      text: 'Xin chào! Mình là Linh từ EV Care 👋 Mình có thể giúp gì cho bạn hôm nay?',
      time: '09:01',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    scrollToEnd();
  }, [messages, isTyping]);

  const now = () =>
    new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  const sendMessage = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content && !attachedFile) return;

    // customer message
    const newMsgs: ChatMsg[] = [];
    if (content) {
      newMsgs.push({ id: crypto.randomUUID(), role: 'customer', text: content, time: now() });
    }
    if (attachedFile) {
      const url = URL.createObjectURL(attachedFile);
      newMsgs.push({
        id: crypto.randomUUID(),
        role: 'customer',
        time: now(),
        fileName: attachedFile.name,
        fileType: attachedFile.type,
        fileUrl: url,
      });
    }

    setMessages((prev) => [...prev, ...newMsgs]);
    setInput('');
    setAttachedFile(null);

    // mock agent typing + reply
    setIsTyping(true);
    setTimeout(() => {
      const replyText = autoReply(content);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'agent',
          text: replyText,
          time: now(),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const autoReply = (text?: string) => {
    const t = (text || '').toLowerCase();
    if (t.includes('đặt lịch') || t.includes('booking')) {
      return 'Mình đã mở trang đặt lịch cho bạn. Vui lòng chọn trung tâm và thời gian phù hợp nha!';
    }
    if (t.includes('cứu hộ') || t.includes('sự cố')) {
      return 'Đã ghi nhận yêu cầu cứu hộ. Vui lòng cung cấp vị trí hiện tại và số liên hệ. Đội hỗ trợ sẽ gọi cho bạn trong 2-3 phút.';
    }
    if (t.includes('phiếu') || t.includes('service order') || t.includes('tình trạng')) {
      return 'Mình đang kiểm tra tình trạng phiếu dịch vụ của bạn. Vui lòng chờ trong giây lát…';
    }
    return 'Cảm ơn bạn. Mình đã tiếp nhận yêu cầu và sẽ hỗ trợ ngay đây!';
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setAttachedFile(f);
  };

  const quickActions = [
    { label: '📅 Đặt lịch bảo dưỡng', onClick: () => router.push('/customer/booking') },
    { label: '🔧 Xem phiếu dịch vụ', onClick: () => router.push('/staff/service-orders') },
    { label: '🚨 Gọi cứu hộ 24/7', onClick: () => window.alert('Gọi: 1900-123-456') },
  ];

  const quickReplies = [
    'Mình muốn đặt lịch vào tuần này',
    'Xe báo lỗi điện áp thấp',
    'Hỗ trợ kiểm tra pin giúp mình',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-5xl flex items-center gap-3">
          <button
            onClick={() => router.push('/customer/dashboard')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
            title="Về Bảng điều khiển"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Bảng điều khiển</span>
          </button>

          <div className="ml-auto flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-xs text-gray-500 hidden sm:inline">
              Bảo mật đầu cuối · Tuân thủ EV Care
            </span>
          </div>
        </div>
      </div>

      {/* Chat container */}
      <div className="container mx-auto px-6 py-6 max-w-5xl flex flex-col lg:flex-row gap-6">
        {/* Sidebar (thông tin agent + CTA nhanh) */}
        <aside className="lg:w-64 bg-white border border-gray-100 rounded-xl p-4 h-fit">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Trung tâm EV Care</p>
              <p className="text-xs text-emerald-700 inline-flex items-center gap-1">
                <Circle className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                Đang trực (9:00–18:00)
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {quickActions.map((qa) => (
              <button
                key={qa.label}
                onClick={qa.onClick}
                className="w-full text-left text-sm px-3 py-2 rounded-md border hover:bg-gray-50"
              >
                {qa.label}
              </button>
            ))}
          </div>

          <div className="mt-6 p-3 rounded-lg bg-gray-50 text-xs text-gray-600 flex items-start gap-2">
            <Clock className="w-4 h-4 mt-0.5" />
            <p>
              Thời gian phản hồi trung bình: <b>~2 phút</b>. Nếu khẩn cấp, gọi{' '}
              <span className="text-emerald-700 font-medium">1900-123-456</span>.
            </p>
          </div>
        </aside>

        {/* Chat panel */}
        <section className="flex-1 bg-white border border-gray-100 rounded-xl flex flex-col">
          {/* Chat header mini */}
          <div className="px-4 py-3 border-b flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-800">Bạn</p>
              <p className="text-xs text-gray-500">Khách hàng EV Care</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                  m.role === 'customer'
                    ? 'bg-emerald-600 text-white ml-auto rounded-br-sm'
                    : m.role === 'agent'
                    ? 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    : 'bg-emerald-50 text-emerald-800 mx-auto'
                }`}
              >
                {m.text && <p className="text-sm leading-relaxed">{m.text}</p>}

                {m.fileUrl && (
                  <div className="mt-1">
                    {m.fileType?.startsWith('image/') ? (
                      // preview ảnh
                      <img
                        src={m.fileUrl}
                        alt={m.fileName}
                        className="rounded-lg max-h-64 object-contain"
                      />
                    ) : (
                      // file thường
                      <a
                        href={m.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs underline"
                      >
                        <FileText className="w-4 h-4" />
                        {m.fileName}
                      </a>
                    )}
                  </div>
                )}

                <div
                  className={`text-[10px] mt-1 ${
                    m.role === 'customer' ? 'text-emerald-50/90' : 'text-gray-500'
                  }`}
                >
                  {m.time}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="max-w-[70%] rounded-2xl px-4 py-2 bg-gray-100 text-gray-700 shadow-sm">
                <span className="inline-flex items-center gap-2">
                  Đang nhập
                  <span className="inline-flex gap-1">
                    <span className="animate-pulse">•</span>
                    <span className="animate-pulse [animation-delay:150ms]">•</span>
                    <span className="animate-pulse [animation-delay:300ms]">•</span>
                  </span>
                </span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick replies */}
          <div className="px-4 pb-2 flex flex-wrap gap-2 border-t bg-white">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-3 py-1.5 rounded-full border hover:bg-gray-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 border-t bg-white flex items-center gap-2"
          >
            <label
              title="Đính kèm hình ảnh"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-gray-50 cursor-pointer"
            >
              <ImageIcon className="w-5 h-5 text-gray-600" />
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>

            <label
              title="Đính kèm tệp"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-gray-50 cursor-pointer"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
              <input type="file" className="hidden" onChange={handleFile} />
            </label>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            />

            <button
              type="submit"
              className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              <Send className="w-4 h-4 mr-1" />
              Gửi
            </button>
          </form>

          {/* Hotline */}
          <div className="px-4 py-2 text-xs text-gray-500 border-t bg-gray-50">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Hotline trung tâm: <b>1900-123-456</b>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
