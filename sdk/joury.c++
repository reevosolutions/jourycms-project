//+------------------------------------------------------------------+
//|                                              Joury_Advisor_1.mq5 |
//|                                    Copyright 2024, AssilDev Ltd. |
//|                                                https://assil.dev |
//+------------------------------------------------------------------+

#property strict

#include <Trade\Trade.mqh> // Include the trading library

CTrade trade; // Create an instance of the CTrade class

// Define constants for log types
#define LOG_SUCCESS "success"
#define LOG_ERROR "error"
#define LOG_WARNING "warning"
#define LOG_INFO "info"
#define LOG_VALUE "value" // New log type for magenta color

// Function to log messages with color
void LogMessage(string message, string type = LOG_INFO)
{
   string colorCode;
   PrintFormat("%s: %s", type, message);
   // Determine color based on log type
   if (type == LOG_SUCCESS)
      colorCode = "\033[32m"; // Green
   else if (type == LOG_ERROR)
      colorCode = "\033[31m"; // Red
   else if (type == LOG_WARNING)
      colorCode = "\033[33m"; // Yellow
   else if (type == LOG_VALUE)
      colorCode = "\033[35m"; // Magenta
   else
      colorCode = "\033[0m"; // Default (white or terminal color)

   // Print the message with color
   // PrintFormat("%s%s\033[0m", colorCode, message);
}

// Input parameters
input double Lots = 0.1;        // Lot size
input double Slippage = 3;      // Slippage in points
input int MagicNumber = 123456; // Magic number for identifying orders

// Levels for strategy
double Resistance = 0.0;        // Resistance (highest before going down)
double Support = 0.0;           // Support (lowest before going up)
double ThreeQuartersDown = 0.0; // Entry point (third quarter between cyan and red)
double Trigger = 0.0;           // Confirmation (first close above cyan)

// Order handling flags
bool BuyOrderPlaced = false;

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   LogMessage("Candlestick Strategy EA initialized!", LOG_SUCCESS);
   return (INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   string reasonText;
   switch (reason)
   {
   case REASON_REMOVE:
      reasonText = "EA removed from chart.";
      break;
   case REASON_RECOMPILE:
      reasonText = "EA recompiled.";
      break;
   case REASON_CHARTCLOSE:
      reasonText = "Chart closed.";
      break;
   case REASON_PARAMETERS:
      reasonText = "Parameters changed.";
      break;
   case REASON_ACCOUNT:
      reasonText = "Account changed.";
      break;
   case REASON_TEMPLATE:
      reasonText = "Template loaded.";
      break;
   default:
      reasonText = "Unknown reason for deinitialization.";
   }

   LogMessage(reasonText, LOG_WARNING);
   ObjectsDeleteAll(0); // Delete all chart objects
   LogMessage("Cleanup complete.", LOG_SUCCESS);
}

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
   LogMessage("New tick received.", LOG_INFO);

   // Step 1: Identify key levels if no active buy order
   if (!BuyOrderPlaced)
   {
      LogMessage("No active buy order. Identifying levels.", LOG_INFO);
      IdentifyLevels();
   }

   // Step 2: Check if price hits yellow line
   if (!BuyOrderPlaced && CheckEntryCondition())
   {
      LogMessage("Entry condition met. Placing buy order.", LOG_WARNING);
      PlaceBuyOrder();
   }

   // Step 3: Reset logic after a successful transaction
   if (BuyOrderPlaced && OrderClosedSuccessfully())
   {
      LogMessage("Transaction completed successfully. Resetting logic.", LOG_SUCCESS);
      ResetLogic();
   }
}

//+------------------------------------------------------------------+
//| Function to identify key levels                                  |
//+------------------------------------------------------------------+
void IdentifyLevels()
{
   int TotalBars = 50; // Number of historical bars to analyze

   Resistance = 0.0;
   Support = 0.0;
   Trigger = 0.0;
   int ResistanceIndex = 0;
   int SupportIndex = 0;
   int TriggerStartingIndex = 0;
   int TriggerIndex = 0;

   // Find the highest and lowest points
   for (int i = 1; i < TotalBars; i++)
   {
      double High = iHigh(_Symbol, PERIOD_M5, i);
      double Low = iLow(_Symbol, PERIOD_M5, i);

      if (High > Resistance){
         Resistance = High;
         ResistanceIndex = i;
      }

      if (Low < Support || Support == 0.0)
      {
         Support = Low;
         SupportIndex = i;
         TriggerStartingIndex = i + 1;
      }
   }

   ThreeQuartersDown = Support + (Resistance - Support) * 0.25; // 25% of the range

   // Find the trigger
   for (int i = TriggerStartingIndex; i < TotalBars; i++)
   {
      double Close = iClose(_Symbol, PERIOD_M5, i);
      LogMessage("Close: " + DoubleToString(Close, 5) + ", at index: " + IntegerToString(i), LOG_VALUE);
      if (Close > Resistance)
      {
         Trigger = Close;
         TriggerIndex = i;
         break;
      }
   }


   LogMessage("Levels identified: Cyan, Resistance (highest before going down) = " + DoubleToString(Resistance, 5) +
                  ", Red, Support (lowest before going up) = " + DoubleToString(Support, 5) +
                  ", Yellow, Entry point (third quarter between cyan and red) = " + DoubleToString(ThreeQuartersDown, 5) +
                  ", Green, Confirmation (first close above cyan) = " + DoubleToString(Trigger, 5) +
                  ", INDEXES: Resistance: " + IntegerToString(ResistanceIndex) + ", Support: " + IntegerToString(SupportIndex) + ", Trigger: " + IntegerToString(TriggerIndex),
              LOG_VALUE);
}

//+------------------------------------------------------------------+
//| Function to check entry condition                                |
//+------------------------------------------------------------------+
bool CheckEntryCondition()
{
   double BidPrice = SymbolInfoDouble(_Symbol, SYMBOL_BID);

   if (BidPrice <= ThreeQuartersDown)
   {
      LogMessage("Price touched ThreeQuartersDown: " + DoubleToString(BidPrice, 5), LOG_WARNING);
      return true;
   }
   return false;
}

//+------------------------------------------------------------------+
//| Function to place a buy order                                    |
//+------------------------------------------------------------------+
void PlaceBuyOrder()
{
   double Price = SymbolInfoDouble(_Symbol, SYMBOL_ASK); // Current Ask price
   double SL = Support;                                  // Stop Loss level
   double TP = Resistance;                               // Take Profit level

   // Ensure the Stop Loss and Take Profit are valid
   if (SL == 0.0 || TP == 0.0)
   {
      LogMessage("Error: Invalid SL or TP values.", LOG_ERROR);
      return;
   }

   // Check if the SL and TP values are within valid price bounds
   double BidPrice = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double AskPrice = SymbolInfoDouble(_Symbol, SYMBOL_ASK);

   if (SL < BidPrice || TP > AskPrice)
   {
      LogMessage("Error: SL or TP is outside market bounds.", LOG_ERROR);
      return;
   }

   // Try to place the buy order
   bool orderResult = trade.Buy(Lots, _Symbol, 0, SL, TP, "");

   if (orderResult)
   {
      LogMessage("Buy order placed successfully!", LOG_SUCCESS);
      BuyOrderPlaced = true;
   }
   else
   {
      LogMessage("Failed to place buy order. Error: " + IntegerToString(GetLastError()), LOG_ERROR);
   }
}

//+------------------------------------------------------------------+
//| Function to check if the order is closed                        |
//+------------------------------------------------------------------+
bool OrderClosedSuccessfully()
{
   // Check if there is any closed position for the specified Magic Number
   for (int i = HistoryOrdersTotal() - 1; i >= 0; i--)
   {
      if (HistoryOrderSelect(i))
      {
         ulong ticket = HistoryOrderGetTicket(i);
         if (HistoryOrderGetInteger(ticket, ORDER_MAGIC) == MagicNumber &&
             HistoryOrderGetInteger(ticket, ORDER_TYPE) == ORDER_TYPE_BUY)

         {
            return true;
         }
      }
   }
   return false;
}

//+------------------------------------------------------------------+
//| Function to reset the logic                                      |
//+------------------------------------------------------------------+
void ResetLogic()
{
   Resistance = 0.0;
   Support = 0.0;
   ThreeQuartersDown = 0.0;
   Trigger = 0.0;
   BuyOrderPlaced = false;
   LogMessage("Logic reset successfully.", LOG_SUCCESS);
}
