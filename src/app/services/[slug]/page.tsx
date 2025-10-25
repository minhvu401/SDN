'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const serviceDetails = {
  'bao-duong-dinh-ky': {
    title: 'Bảo dưỡng định kỳ',
    icon: '🔧',
    shortDesc:
      'Bảo dưỡng toàn diện giúp xe điện của bạn hoạt động êm ái, tiết kiệm năng lượng và luôn trong trạng thái tốt nhất.',
    duration: '60 – 90 phút',
    price: 'Từ 400.000 – 800.000 VNĐ/lần',
    steps: [
      'Kiểm tra tổng thể xe: phanh, lốp, đèn, còi, hệ thống điện và cảm biến.',
      'Thay dầu hộp số, vệ sinh lọc gió và làm sạch các chi tiết bị bám bụi.',
      'Kiểm tra pin, dung lượng sạc/xả, cập nhật phần mềm điều khiển.',
      'Cân chỉnh hệ thống treo, tay lái, khung xe để đảm bảo vận hành cân bằng.',
    ],
    benefits: [
      'Tăng tuổi thọ pin và động cơ.',
      'Giảm nguy cơ hỏng hóc đột ngột.',
      'Tiết kiệm chi phí sửa chữa dài hạn.',
      'Đảm bảo an toàn cho người và xe trong mọi điều kiện di chuyển.',
    ],
  },
  'thay-the-pin': {
    title: 'Thay thế pin xe điện',
    icon: '🔋',
    shortDesc:
      'Dịch vụ thay pin chính hãng giúp tối ưu hiệu suất, tăng tuổi thọ pin và đảm bảo an toàn tuyệt đối.',
    duration: '30 – 45 phút',
    price: 'Từ 2.000.000 – 12.000.000 VNĐ tuỳ loại pin',
    steps: [
      'Đánh giá tình trạng pin hiện tại: chu kỳ sạc, dung lượng và nhiệt độ vận hành.',
      'Tư vấn chọn loại pin tương thích với model xe.',
      'Thay thế pin đúng quy chuẩn kỹ thuật, kiểm tra an toàn điện sau lắp đặt.',
      'Cập nhật lại hệ thống quản lý năng lượng (BMS).',
    ],
    benefits: [
      'Tăng thời gian sử dụng và quãng đường di chuyển.',
      'Giảm nguy cơ cháy nổ, phồng pin do lỗi kỹ thuật.',
      'Pin chính hãng có chứng nhận và bảo hành chính thức.',
      'Cải thiện hiệu suất sạc và tốc độ tăng tốc.',
    ],
  },
  'kiem-tra-phanh-lop': {
    title: 'Kiểm tra phanh & lốp',
    icon: '🛞',
    shortDesc:
      'Đảm bảo an toàn cho mỗi hành trình với quy trình kiểm tra phanh và lốp chuyên sâu, đúng chuẩn kỹ thuật.',
    duration: '45 – 60 phút',
    price: 'Từ 300.000 – 600.000 VNĐ/lần',
    steps: [
      'Kiểm tra độ mòn má phanh, đĩa phanh và dầu phanh.',
      'Đo áp suất lốp, vá hoặc thay mới khi cần thiết.',
      'Cân chỉnh góc đặt bánh xe, cân bằng động và hệ thống ABS.',
      'Vệ sinh cụm phanh, tra dầu chống gỉ và kiểm tra độ nhạy.',
    ],
    benefits: [
      'Phanh êm hơn, rút ngắn quãng đường phanh.',
      'Tăng độ bám đường, tránh trượt bánh khi đi mưa.',
      'Kéo dài tuổi thọ lốp và giảm hao điện.',
      'Đảm bảo an toàn tuyệt đối khi di chuyển tốc độ cao.',
    ],
  },
  've-sinh-rua-xe': {
    title: 'Vệ sinh & rửa xe toàn diện',
    icon: '🧼',
    shortDesc:
      'Giữ xe luôn sáng bóng, sạch đẹp và bảo vệ các chi tiết điện tử bằng quy trình rửa chuyên nghiệp.',
    duration: '30 – 40 phút',
    price: 'Từ 100.000 – 300.000 VNĐ/lần',
    steps: [
      'Rửa thân xe bằng dung dịch chuyên dụng, không ăn mòn lớp sơn.',
      'Vệ sinh khoang máy, bánh xe, gầm và cụm phanh.',
      'Làm sạch nội thất, sấy khô và khử mùi bằng công nghệ ion âm.',
      'Phủ nano bảo vệ lớp sơn, chống tia UV và chống bám bụi.',
    ],
    benefits: [
      'Xe sạch sẽ, sáng bóng như mới.',
      'Bảo vệ bề mặt sơn và chi tiết nhựa khỏi oxy hoá.',
      'Giảm bụi bẩn bám và hạn chế rỉ sét khung gầm.',
      'Tăng tính thẩm mỹ và giữ giá trị xe lâu dài.',
    ],
  },
  'kiem-tra-he-thong-dien': {
    title: 'Kiểm tra hệ thống điện',
    icon: '⚡',
    shortDesc:
      'Kiểm tra chuyên sâu hệ thống điện, dây dẫn, cảm biến và bộ điều khiển để phát hiện lỗi sớm và tối ưu hiệu suất.',
    duration: '60 phút',
    price: 'Từ 350.000 – 900.000 VNĐ/lần',
    steps: [
      'Đo điện áp, dòng điện và công suất tiêu thụ.',
      'Kiểm tra dây dẫn, cảm biến, cầu chì và bộ điều khiển trung tâm.',
      'Phát hiện và khắc phục lỗi chập, ngắn mạch hoặc tiếp xúc kém.',
      'Tối ưu phần mềm điều khiển để xe vận hành ổn định hơn.',
    ],
    benefits: [
      'Phát hiện sớm lỗi điện nguy hiểm.',
      'Giảm hao điện và tăng hiệu suất động cơ.',
      'Bảo vệ pin và các linh kiện điện tử quan trọng.',
      'Đảm bảo an toàn tuyệt đối cho người sử dụng.',
    ],
  },
  'cuu-ho-xe-dien': {
    title: 'Cứu hộ xe điện 24/7',
    icon: '🚨',
    shortDesc:
      'Hỗ trợ khẩn cấp 24/7: sạc pin di động, thay bánh, kéo xe về trạm dịch vụ nhanh chóng, an toàn.',
    duration: 'Theo thực tế',
    price: 'Phí hỗ trợ từ 200.000 VNĐ/lần',
    steps: [
      'Tiếp nhận yêu cầu cứu hộ qua hotline hoặc ứng dụng EV Care.',
      'Đội cứu hộ di chuyển đến vị trí trong vòng 15–30 phút.',
      'Hỗ trợ sạc pin khẩn cấp, thay bánh xe hoặc khắc phục lỗi tại chỗ.',
      'Nếu cần, kéo xe về trạm bảo dưỡng gần nhất và lập báo cáo tình trạng.',
    ],
    benefits: [
      'Hỗ trợ khẩn cấp 24/7, nhanh chóng và chuyên nghiệp.',
      'Giảm thiểu rủi ro khi xe gặp sự cố giữa đường.',
      'Đảm bảo an toàn tuyệt đối cho người và phương tiện.',
      'Có mặt ở mọi khu vực trong nội thành và các tuyến quốc lộ chính.',
    ],
  },
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const router = useRouter();

  const service = serviceDetails[slug as keyof typeof serviceDetails];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
        <Navbar />
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">Dịch vụ không tồn tại 😢</h1>
        <button
          onClick={() => router.push('/services')}
          className="text-emerald-600 hover:underline"
        >
          Quay lại danh sách dịch vụ
        </button>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-10 text-center">
        <div className="text-5xl mb-3">{service.icon}</div>
        <h1 className="text-3xl font-bold text-emerald-700 font-display">{service.title}</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{service.shortDesc}</p>
      </div>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-6 py-12 max-w-4xl space-y-8">
        <section className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Quy trình thực hiện</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {service.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </section>

        <section className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Lợi ích dịch vụ</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {service.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>

        <section className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 text-center">
          <p className="text-gray-700 text-base mb-2">
            <strong>Thời gian thực hiện:</strong> {service.duration}
          </p>
          <p className="text-gray-700 text-base mb-6">
            <strong>Giá dịch vụ:</strong> {service.price}
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/booking"
              className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Đặt lịch ngay →
            </a>
            <button
              onClick={() => router.push('/services')}
              className="border border-emerald-600 text-emerald-600 px-6 py-2 rounded-md hover:bg-emerald-50 transition"
            >
              Quay lại danh sách
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
