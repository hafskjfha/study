#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

#define mod(a, b) (((a) % (b) + (b)) % (b))

int inverse_26(int a){
    for (int i=0;i<26;i++){
        if (mod((a*i),26)==1)return i;
    }
    return -1;
}

int caesar_EN(int x, int k){
    return mod(x+k,26);
}

int caesar_DE(int y, int k){
    return mod(y-k,26);
}

int affine_EN(int x, int k1, int k2){
    return mod(x*k1+k2,26);
}

int affine_DE(int y, int k1, int k2){
    int r=inverse_26(k1);
    if (r==-1)return -1;
    return mod((y-k2)*r,26);
}

int main(void){
    int x,k;
    printf("Input Number(0~26): ");
    scanf("%d",&x);
    printf("*** Caesar Test ***\n");
    printf("Input Caesar Key (k): ");
    scanf("%d",&k);
    printf("Encrypted: %d\n", caesar_EN(x,k));
    printf("Decrypted: %d\n", caesar_DE(caesar_EN(x,k),k));
    printf("\n*** Affine Test ***\n");
    int k1,k2;
    printf("Input Affine key (k1): ");
    scanf("%d",&k1);
    printf("Input Affine key (k2): ");
    scanf("%d",&k2);
    int c=affine_EN(x,k1,k2);
    printf("Encrypted: %d\n",c);
    int p=affine_DE(c,k1,k2);
    if (p==-1){ printf("k1's inverse not exist. thus, not decrypted.\nDecrypted: -1"); }
    else{ printf("Decrypted: %d\n",p); }
    
}