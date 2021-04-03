#include <math.h>
#include <stdlib.h>
#include <time.h>
#include <emscripten.h>

int EMSCRIPTEN_KEEPALIVE run() {
    srand((unsigned)time(NULL));

    int i;
    double buffer[10000];

    for(i = 0; i < 10000; i++)
    {
        buffer[i] = sin(2000 * (2 * M_PI) * i / 6000) + sqrt(0.01) * rand();
    }



    return 0;
}