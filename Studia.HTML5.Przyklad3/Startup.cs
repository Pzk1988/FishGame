using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Studia.HTML5.Przyklad3.Startup))]
namespace Studia.HTML5.Przyklad3
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
