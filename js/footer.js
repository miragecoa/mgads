// Footer组件HTML模板
var footerHTML = '\
<!-- Footer -->\
<footer class="footer">\
    <div class="footer-container">\
        <div class="footer-logo">\
            <img src="切图/footer-logo.png" alt="MG广告平台">\
        </div>\
        \
        <div class="footer-content">\
            <div class="footer-section">\
                <h3 class="footer-title" data-i18n="footer.product">产品</h3>\
                <nav class="footer-links">\
                    <a href="liuliang-zhu.html" class="footer-link" data-i18n="footer.traffic">流量变现</a>\
                    <a href="guanggao-zhu.html" class="footer-link" data-i18n="footer.advertiser">广告主</a>\
                </nav>\
            </div>\
            \
            <div class="footer-section">\
                <h3 class="footer-title" data-i18n="footer.docs">文档</h3>\
                <nav class="footer-links">\
                    <a href="https://doc.mguwp.net/" class="footer-link" target="_blank" data-i18n="footer.dev_docs">开发者文档</a>\
                    <a href="https://www.mguwp.net/developer_agreement.html" class="footer-link" target="_blank" data-i18n="footer.compliance">合规指南</a>\
                    <a href="https://www.mguwp.net/developer_agreement.html" class="footer-link" target="_blank" data-i18n="footer.privacy">隐私政策</a>\
                    <a href="https://www.mguwp.net/developer_agreement.html" class="footer-link" target="_blank" data-i18n="footer.agreement">开发者协议</a>\
                </nav>\
            </div>\
            \
            <div class="footer-section">\
                <h3 class="footer-title" data-i18n="footer.about">关于我们</h3>\
                <nav class="footer-links">\
                    <a href="https://www.mguwp.net/about_index.html" class="footer-link" target="_blank" data-i18n="footer.intro">公司介绍</a>\
                    <a href="https://www.mguwp.net/about_cooperation.html" class="footer-link" target="_blank" data-i18n="footer.coop">商务合作</a>\
                    <a href="https://www.mguwp.net/about_contact.html" class="footer-link" target="_blank" data-i18n="footer.contact">联系我们</a>\
                </nav>\
            </div>\
            \
            <div class="footer-section">\
                <h3 class="footer-title" data-i18n="footer.support">支持</h3>\
                <nav class="footer-links">\
                    <a href="faq.html" class="footer-link" data-i18n="footer.faq">常见问题</a>\
                </nav>\
            </div>\
        </div>\
        \
        <div class="footer-social">\
            <a href="https://discord.com/invite/rxCTxr2gN4" class="social-link" target="_blank"><img src="切图/1.png" alt="社交媒体1"></a>\
            <a href="javascript:void(0)" class="social-link"><img src="切图/2.png" alt="社交媒体2"></a>\
            <a href="https://www.linkedin.com/company/miracle-games-inc/" class="social-link" target="_blank"><img src="切图/3.png" alt="社交媒体3"></a>\
            <a href="javascript:void(0)" class="social-link"><img src="切图/4.png" alt="社交媒体4"></a>\
        </div>\
        \
        <div class="footer-divider"></div>\
        \
        <div class="footer-copyright" data-i18n="footer.copyright">\
            北京奇游灵动科技有限公司版权所有 COPYRIGHT© 2016-2025 MIRACLE GAMES INC ALL RIGHTS RESERVED.<br>\
            经营许可证编号: 京B2-20230011 | 京ICP备16022485号-1 | 京网文[2017]1979-172号 | 京公网安备11010502041007号\
        </div>\
    </div>\
</footer>';

// 页面加载完成后插入Footer
document.addEventListener('DOMContentLoaded', function() {
    // 加载Header的函数 (Wait, loadHeader is in header.js, footer loads independently)
    // Modify footer loading to insert into placeholder if exists, or append to body.
    // Consistent with header logic.
    var placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.innerHTML = footerHTML;
    } else {
        // Fallback for pages that might not have the placeholder
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    // Trigger i18n update if available
    if (typeof updatePageContent === 'function') {
        updatePageContent();
    }
});
