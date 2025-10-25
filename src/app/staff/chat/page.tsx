'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  ArrowLeft,
  Send,
  Paperclip,
  Image as ImageIcon,
  User as UserIcon,
  Bot,
  FileText,
  Circle,
  Phone,
  Clock,
  MessageSquare,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type ChatMsg = {
  id: string;
  role: 'staff' | 'customer' | 'system';
  text?: string;
  time: string;
  fileName?: string;
  fileType?: string;
  fileUrl?: string;
};

export default function StaffChatPage() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'sys-1',
      role: 'system',
      text: 'Kênh tư vấn trực tuyến EV Care đã được khởi tạo.',
      time: '09:00',
    },
    {
      id: 'cus-1',
      role: 'customer',
      text: 'Xin chào trung tâm! Xe tôi báo lỗi pin yếu.',
      time: '09:01',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToEnd(), [messages, isTyping]);

  const now = () =>
    new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setAttachedFile(f);
  };

  const sendMessage = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content && !attachedFile) return;

    const newMsgs: ChatMsg[] = [];
    if (content) {
      newMsgs.push({ id: crypto.randomUUID(), role: 'staff', text: content, time: now() });
    }
    if (attachedFile) {
      const url = URL.createObjectURL(attachedFile);
      newMsgs.push({
        id: crypto.randomUUID(),
        role: 'staff',
        time: now(),
        fileName: attachedFile.name,
        fileType: attachedFile.type,
        fileUrl: url,
      });
    }
    setMessages((prev) => [...prev, ...newMsgs]);
    setInput('');
    setAttachedFile(null);

    // giả lập khách trả lời
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'customer',
          text: 'Cảm ơn nhân viên! Mình đã hiểu rồi.',
          time: now(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const customers = [
    { id: 'c1', name: 'Nguyễn Văn A', status: 'Đang chat' },
    { id: 'c2', name: 'Trần Thị B', status: 'Chờ phản hồi' },
    { id: 'c3', name: 'Phạm Minh C', status: 'Kết thúc' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6 max-w-6xl flex items-center gap-3">
          <button
            onClick={() => router.push('/staff/dashboard')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Trang nhân viên</span>
          </button>

          <div className="ml-auto flex items-center gap-3">
            <Circle className="w-3 h-3 fill-emerald-500 text-emerald-500" />
            <span className="text-xs text-gray-500">Trực tuyến (9:00–18:00)</span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="container mx-auto px-6 py-6 max-w-6xl flex flex-col lg:flex-row gap-6">
        {/* Sidebar - danh sách khách */}
        <aside className="lg:w-64 bg-white border border-gray-100 rounded-xl p-4 h-fit">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Nhân viên trực tuyến</p>
              <p className="text-xs text-gray-500">Linh – EV Care Support</p>
            </div>
          </div>

          <div className="space-y-2">
            {customers.map((c) => (
              <button
                key={c.id}
                className="w-full text-left px-3 py-2 rounded-md border hover:bg-gray-50 flex flex-col"
              >
                <span className="text-sm font-medium text-gray-800">{c.name}</span>
                <span className="text-xs text-gray-500">{c.status}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 flex items-start gap-2">
            <Clock className="w-4 h-4 mt-0.5" />
            <p>
              Trung bình mỗi ca: <b>15 khách</b> · Thời gian phản hồi: <b>~1 phút</b>
            </p>
          </div>
        </aside>

        {/* Chat panel */}
        <section className="flex-1 bg-white border border-gray-100 rounded-xl flex flex-col">
          <div className="px-4 py-3 border-b flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
              <Bot className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-800">Khách hàng</p>
              <p className="text-xs text-gray-500">Nguyễn Văn A (VinFast Feliz S)</p>
            </div>
          </div>

          {/* Chat content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                  m.role === 'staff'
                    ? 'bg-emerald-600 text-white ml-auto rounded-br-sm'
                    : m.role === 'customer'
                    ? 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    : 'bg-emerald-50 text-emerald-800 mx-auto'
                }`}
              >
                {m.text && <p className="text-sm leading-relaxed">{m.text}</p>}

                {m.fileUrl && (
                  <div className="mt-1">
                    {m.fileType?.startsWith('image/') ? (
                      <img
                        src={m.fileUrl}
                        alt={m.fileName}
                        className="rounded-lg max-h-64 object-contain"
                      />
                    ) : (
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
                    m.role === 'staff' ? 'text-emerald-50/90' : 'text-gray-500'
                  }`}
                >
                  {m.time}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="max-w-[70%] rounded-2xl px-4 py-2 bg-gray-100 text-gray-700 shadow-sm">
                <span className="inline-flex items-center gap-2">
                  Khách đang nhập
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

          {/* Input box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 border-t bg-white flex items-center gap-2"
          >
            <label className="inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-gray-50 cursor-pointer">
              <ImageIcon className="w-5 h-5 text-gray-600" />
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>

            <label className="inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-gray-50 cursor-pointer">
              <Paperclip className="w-5 h-5 text-gray-600" />
              <input type="file" className="hidden" onChange={handleFile} />
            </label>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn trả lời..."
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

          {/* Footer hotline */}
          <div className="px-4 py-2 text-xs text-gray-500 border-t bg-gray-50">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Tổng đài kỹ thuật: <b>1900-123-456</b>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
