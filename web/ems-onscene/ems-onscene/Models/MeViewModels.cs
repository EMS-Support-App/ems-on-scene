﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ems_onscene.Models
{
    // Models returned by MeController actions.
    public class GetViewModel
    {
        public string MemberName { get; set; }
    }
}