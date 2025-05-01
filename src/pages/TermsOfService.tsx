
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import { Card } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-syrian-dark mb-4">
              <ArabicText text="شروط الاستخدام" size="large" />
            </h1>
            <p className="text-lg text-syrian-dark/70 max-w-2xl mx-auto">
              <ArabicText text="يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع" />
            </p>
          </div>
          
          <Card className="p-8 max-w-4xl mx-auto">
            <div className="space-y-6 text-right" dir="rtl">
              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="شروط الاستخدام" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="باستخدام هذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام والامتثال لها. إذا كنت لا توافق على أي جزء من هذه الشروط، فيرجى عدم استخدام موقعنا." />
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="استخدام الموقع" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="يتم توفير المحتوى الموجود على هذا الموقع لأغراض المعلومات العامة فقط. نحن نحتفظ بالحق في تعديل أو إزالة المحتوى من موقعنا في أي وقت دون إشعار." />
                </p>
                <p className="text-syrian-dark/80">
                  <ArabicText text="لن نكون مسؤولين تجاهك أو أي طرف ثالث عن أي تعديل أو تعليق أو إيقاف للموقع." />
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="المعلومات المقدمة من المستخدمين" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="يجب أن تكون الإعلانات والمحتوى المنشور من قبل المستخدمين دقيقًا وغير مضلل وقانونيًا في جميع الأوقات." />
                </p>
                <p className="text-syrian-dark/80">
                  <ArabicText text="يحظر نشر المحتوى الذي يحتوي على:" />
                </p>
                <ul className="list-disc list-inside space-y-1 mr-6">
                  <li>
                    <ArabicText text="محتوى إباحي أو فاحش" />
                  </li>
                  <li>
                    <ArabicText text="خطاب الكراهية أو التحريض على العنف" />
                  </li>
                  <li>
                    <ArabicText text="معلومات شخصية عن الآخرين دون إذنهم" />
                  </li>
                  <li>
                    <ArabicText text="مواد تنتهك حقوق الملكية الفكرية" />
                  </li>
                  <li>
                    <ArabicText text="محتوى يروج لمنتجات أو خدمات غير قانونية" />
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="الملكية الفكرية" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="هذا الموقع وجميع المحتويات، بما في ذلك على سبيل المثال لا الحصر، النص والرسومات والشعارات والرموز والصور، هي ملك لنا أو مرخصينا وهي محمية بموجب قوانين حقوق النشر." />
                </p>
                <p className="text-syrian-dark/80">
                  <ArabicText text="أي استخدام غير مصرح به لمحتوى الموقع قد ينتهك قوانين حقوق النشر والعلامات التجارية والقوانين الأخرى." />
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="المعاملات" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="نحن نوفر منصة للمستخدمين للتواصل وإجراء المعاملات فيما بينهم. نحن لسنا طرفًا في أي معاملات بين المستخدمين ولسنا مسؤولين عن جودة أو سلامة أو قانونية أي منتجات أو خدمات معروضة." />
                </p>
                <p className="text-syrian-dark/80">
                  <ArabicText text="يتحمل المستخدمون المسؤولية الكاملة عن التعامل بأمان وتوخي الحذر عند التفاعل مع مستخدمين آخرين." />
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="إخلاء المسؤولية" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="يتم توفير موقعنا 'كما هو' و'كما هو متاح' دون أي ضمانات، صريحة كانت أم ضمنية. لا نقدم أي ضمانات بأن الموقع سيكون آمنًا أو خاليًا من الأخطاء أو الفيروسات." />
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="حدود المسؤولية" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="لن نكون مسؤولين عن أي خسارة أو ضرر، بما في ذلك على سبيل المثال لا الحصر، الخسارة أو الضرر غير المباشر أو التبعي، أو أي خسارة أو ضرر ينشأ عن فقدان البيانات أو الأرباح الناشئة عن استخدام موقعنا." />
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-bold text-syrian-dark">
                  <ArabicText text="التعديلات على الشروط" />
                </h2>
                <p className="text-syrian-dark/80">
                  <ArabicText text="نحن نحتفظ بالحق في تعديل هذه الشروط من وقت لآخر. سيتم نشر الشروط المحدثة على هذه الصفحة." />
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

export default TermsOfService;
