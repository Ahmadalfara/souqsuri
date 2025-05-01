
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import { Card } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-syrian-dark mb-4">
              <ArabicText text="سياسة الخصوصية" size="large" />
            </h1>
            <p className="text-lg text-syrian-dark/70 max-w-2xl mx-auto">
              <ArabicText text="نلتزم بحماية خصوصيتك وبياناتك الشخصية" />
            </p>
          </div>
          
          <Card className="p-8 max-w-4xl mx-auto">
            <div className="space-y-6 text-right" dir="rtl">
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="مقدمة" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="نحن نقدر ثقتك في تزويدنا ببياناتك الشخصية، ونحن ملتزمون بضمان حمايتها. تصف هذه السياسة كيفية جمع واستخدام البيانات الشخصية التي تقدمها لنا." />
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="البيانات التي نجمعها" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="قد نقوم بجمع البيانات التالية:" />
                </p>
                <ul className="list-disc list-inside space-y-1 mr-6">
                  <li>
                    <ArabicText text="الاسم ومعلومات الاتصال بما في ذلك عنوان البريد الإلكتروني ورقم الهاتف" />
                  </li>
                  <li>
                    <ArabicText text="معلومات ديموغرافية مثل الرمز البريدي والتفضيلات والاهتمامات" />
                  </li>
                  <li>
                    <ArabicText text="معلومات أخرى ذات صلة بالاستطلاعات والعروض" />
                  </li>
                  <li>
                    <ArabicText text="تفاصيل الإعلانات التي تنشرها على موقعنا" />
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="كيفية استخدام البيانات" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="نحتاج إلى هذه المعلومات لفهم احتياجاتك وتقديم خدمة أفضل لك، وعلى وجه الخصوص للأسباب التالية:" />
                </p>
                <ul className="list-disc list-inside space-y-1 mr-6">
                  <li>
                    <ArabicText text="الاحتفاظ بسجلات داخلية" />
                  </li>
                  <li>
                    <ArabicText text="تحسين منتجاتنا وخدماتنا" />
                  </li>
                  <li>
                    <ArabicText text="إرسال رسائل بريد إلكتروني ترويجية حول منتجات جديدة أو معلومات أخرى نعتقد أنها قد تكون مثيرة للاهتمام بالنسبة لك" />
                  </li>
                  <li>
                    <ArabicText text="الاتصال بك لأغراض البحث السوقي" />
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="أمن البيانات" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="نحن ملتزمون بضمان أمان بياناتك. من أجل منع الوصول غير المصرح به أو الكشف عنها، وضعنا إجراءات مادية وإلكترونية وإدارية مناسبة لحماية المعلومات التي نجمعها عبر الإنترنت." />
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="كيفية استخدام ملفات تعريف الارتباط (Cookies)" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="ملف تعريف الارتباط هو ملف صغير يطلب الإذن ليتم وضعه على محرك الأقراص الصلب بجهاز الكمبيوتر الخاص بك. بمجرد موافقتك، تتم إضافة الملف ويساعد ملف تعريف الارتباط في تحليل حركة المرور على الويب أو يتيح لك معرفة وقت زيارتك لموقع معين." />
                </p>
                <p className="text-syrian-dark/80">
                  <ArabicText text="نحن نستخدم ملفات تعريف الارتباط لتحديد الصفحات التي يتم زيارتها والميزات المستخدمة. هذا يساعدنا في تحليل البيانات حول حركة مرور صفحات الويب وتحسين موقعنا على الويب من أجل تخصيصه وفقًا لاحتياجات العملاء." />
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="التحكم في معلوماتك الشخصية" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="يمكنك اختيار تقييد جمع أو استخدام معلوماتك الشخصية بالطرق التالية:" />
                </p>
                <ul className="list-disc list-inside space-y-1 mr-6">
                  <li>
                    <ArabicText text="عندما يُطلب منك ملء نموذج على الموقع، ابحث عن المربع الذي يمكنك النقر عليه للإشارة إلى أنك لا ترغب في استخدام المعلومات لأغراض التسويق المباشر" />
                  </li>
                  <li>
                    <ArabicText text="إذا كنت قد وافقت مسبقًا على استخدام معلوماتك الشخصية لأغراض التسويق المباشر، يمكنك تغيير رأيك في أي وقت عن طريق الاتصال بنا." />
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="التغييرات على سياسة الخصوصية" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر. سننشر أي تغييرات على سياسة الخصوصية على هذه الصفحة." />
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="الاتصال بنا" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو معلوماتك الشخصية التي نحتفظ بها، يرجى الاتصال بنا." />
                </p>
              </section>
              
              <div className="text-center pt-4">
                <p className="text-sm text-syrian-dark/50">
                  <ArabicText text="آخر تحديث: ١ مايو ٢٠٢٥" />
                </p>
              </div>
            </div>
          </Card>
        </main>
        <Footer />
      </GeometricPattern>
    </div>
  );
};

export default PrivacyPolicy;
