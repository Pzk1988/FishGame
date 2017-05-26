using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Studia.HTML5.Przyklad3.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PeopleList()
        {
            ViewBag.Message = "People list.";
            return View();
        }

        public ActionResult Table()
        {
            ViewBag.Message = "Table.";
            return View();
        }

        public ActionResult Columns()
        {
            ViewBag.Message = "Columns.";
            return View();
        }

        public ActionResult WebGrid()
        {
            ViewBag.Message = "WebGrid.";
            return View();
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}